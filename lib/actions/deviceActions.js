/* Copyright (c) 2015 - 2018, Nordic Semiconductor ASA
 *
 * All rights reserved.
 *
 * Use in source and binary forms, redistribution in binary form only, with
 * or without modification, are permitted provided that the following conditions
 * are met:
 *
 * 1. Redistributions in binary form, except as embedded into a Nordic
 *    Semiconductor ASA integrated circuit in a product or a software update for
 *    such product, must reproduce the above copyright notice, this list of
 *    conditions and the following disclaimer in the documentation and/or other
 *    materials provided with the distribution.
 *
 * 2. Neither the name of Nordic Semiconductor ASA nor the names of its
 *    contributors may be used to endorse or promote products derived from this
 *    software without specific prior written permission.
 *
 * 3. This software, with or without modification, must only be used with a Nordic
 *    Semiconductor ASA integrated circuit.
 *
 * 4. Any software provided in binary form under this license must not be reverse
 *    engineered, decompiled, modified and/or disassembled.
 *
 * THIS SOFTWARE IS PROVIDED BY NORDIC SEMICONDUCTOR ASA "AS IS" AND ANY EXPRESS OR
 * IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY, NONINFRINGEMENT, AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL NORDIC SEMICONDUCTOR ASA OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR
 * TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 * THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import { logger, getAppDataDir } from 'nrfconnect/core';
import SerialPort from 'serialport';
import { shell } from 'electron';
import path from 'path';
import fs from 'fs';
import checkDiskSpace from 'check-disk-space';

export const DEVICE_OPENED = 'DEVICE_OPENED';
export const DEVICE_CLOSED = 'DEVICE_CLOSED';
export const CAPTURE_TOGGLED = 'CAPTURE_TOGGLED';
export const CAPTURE_STATS = 'CAPTURE_STATS';

let port;
let writable;
let captureInterval;
let diskspaceInterval;

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
        checkDiskSpace(getAppDataDir())
        .then(({ free: freeDiskSpace, size: totalDiskSpace }) => {
            dispatch(captureStatsAction({ freeDiskSpace, totalDiskSpace }));
        });
    };
}

export function open(serialPort) {
    return async dispatch => {
        await dispatch(close());

        port = new SerialPort(serialPort.comName, {
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
        dispatch(deviceOpenedAction(serialPort.comName));

        dispatch(diskSpaceCheck());
        diskspaceInterval = setInterval(() => {
            dispatch(diskSpaceCheck());
        }, 5000);
    };
}

export function toggleCapture() {
    return async (dispatch, getState) => {
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

        const fileName = `trace-${new Date().toISOString().replace(/:/g, '-')}.bin`;
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
        shell.showItemInFolder(filePath);
    };
}
