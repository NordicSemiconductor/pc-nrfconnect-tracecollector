/*
 * Copyright (c) 2015 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeviceSelector, logger } from 'pc-nrfconnect-shared';

import * as DeviceActions from '../actions/deviceActions';

const deviceListing = {
    serialport: true,
};

const last = list => list.slice(-1)[0];

export default () => {
    const dispatch = useDispatch();
    const autoDeviceFilter = useSelector(
        state => state.app.ui.autoDeviceFilter
    );

    const openPort = useCallback(
        device => {
            const tracePort = last(device.serialPorts);
            if (tracePort) {
                dispatch(DeviceActions.open(tracePort.comName));
            } else {
                logger.error("Couldn't identify serial port");
                dispatch({ type: 'DEVICE_DESELECTED' });
            }
        },
        [dispatch]
    );

    const closePort = useCallback(() => {
        dispatch(DeviceActions.close());
    }, [dispatch]);

    const deviceFilter = useCallback(
        device => {
            if (!autoDeviceFilter) {
                return true;
            }

            const supportedBoards = ['PCA10090', 'PCA20035', 'THINGY91'];
            return supportedBoards.includes(device.boardVersion);
        },
        [autoDeviceFilter]
    );

    return (
        <DeviceSelector
            deviceListing={deviceListing}
            deviceFilter={deviceFilter}
            onDeviceSelected={openPort}
            onDeviceDeselected={closePort}
        />
    );
};
