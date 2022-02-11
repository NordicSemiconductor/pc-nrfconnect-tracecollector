/*
 * Copyright (c) 2015 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import remote from '@electron/remote';
import checkDiskSpace from 'check-disk-space';
import fs from 'fs';
import path from 'path';
import { getAppDataDir, logger } from 'pc-nrfconnect-shared';
import SerialPort from 'serialport';

export const AVAILABLE_PORTS = 'AVAILABLE_PORTS';
export const DEVICE_OPENED = 'DEVICE_OPENED';
export const DEVICE_CLOSED = 'DEVICE_CLOSED';
export const CAPTURE_TOGGLED = 'CAPTURE_TOGGLED';
export const CAPTURE_STATS = 'CAPTURE_STATS';

let port;
let writable;
let captureInterval;
let diskspaceInterval;

export function availablePortsAction(ports = []) {
    return {
        type: AVAILABLE_PORTS,
        ports,
    };
}

function deviceOpenedAction(deviceName) {
    return {
        type: DEVICE_OPENED,
        deviceName,
    };
}

function deviceClosedAction() {
    return {
        type: DEVICE_CLOSED,
    };
}

function captureToggleAction(running, filePath) {
    return {
        type: CAPTURE_TOGGLED,
        running: !!running,
        filePath,
    };
}

function captureStatsAction(stats) {
    return {
        type: CAPTURE_STATS,
        ...stats,
    };
}

export function close() {
    return async dispatch => {
        clearInterval(diskspaceInterval);
        if (port && port.isOpen) {
            await new Promise(resolve => {
                port.close(() => {
                    logger.info('Device closed');
                    dispatch(deviceClosedAction());
                    resolve();
                });
            });
        }
        port = undefined;
    };
}

function diskSpaceCheck() {
    return dispatch => {
        checkDiskSpace(getAppDataDir()).then(
            ({ free: freeDiskSpace, size: totalDiskSpace }) => {
                dispatch(captureStatsAction({ freeDiskSpace, totalDiskSpace }));
            }
        );
    };
}

export function open(portPath) {
    return async dispatch => {
        await dispatch(close());

        port = new SerialPort(portPath, {
            baudRate: 1000000,
            parity: 'none',
            dataBits: 8,
            stopBits: 1,
            rtscts: false,
            autoOpen: false,
        });

        port.on('error', err => {
            logger.error('Serial port error: ', err.message);
        });
        port.on('disconnect', () => {
            logger.info('Serial port has been disconnected');
            dispatch({ type: 'SERIAL_PORT_DESELECTED' });
        });

        try {
            await port.open();
        } catch (err) {
            logger.error(err.message);
            dispatch({ type: 'SERIAL_PORT_DESELECTED' });
            return;
        }
        logger.info('Device opened');
        dispatch(deviceOpenedAction(portPath));

        dispatch(diskSpaceCheck());
        diskspaceInterval = setInterval(() => {
            dispatch(diskSpaceCheck());
        }, 5000);
    };
}

export function toggleCapture() {
    return (dispatch, getState) => {
        if (!port) {
            console.error('unreachable code');
            return;
        }

        const { running } = getState().app.capture;
        if (running) {
            if (writable) {
                port.unpipe(writable);
                clearInterval(captureInterval);
                writable.end();
                const { bytesWritten } = writable;
                dispatch(captureStatsAction({ bytesWritten }));
                writable = undefined;
                logger.info('Tracefile closed');
            }
            dispatch(captureToggleAction(false));
            return;
        }

        const fileName = `trace-${new Date()
            .toISOString()
            .replace(/:/g, '-')}.bin`;
        const filePath = path.resolve(getAppDataDir(), fileName);
        writable = fs.createWriteStream(filePath);

        writable.on('open', () => {
            logger.info('Tracefile created:', filePath);

            port.pipe(writable);
            dispatch(captureToggleAction(true, filePath));

            captureInterval = setInterval(() => {
                const { bytesWritten } = writable;
                dispatch(captureStatsAction({ bytesWritten }));
            }, 500);
        });
    };
}

export function showItemInFolder() {
    return (dispatch, getState) => {
        const { filePath } = getState().app.capture;
        remote.shell.showItemInFolder(filePath);
    };
}
