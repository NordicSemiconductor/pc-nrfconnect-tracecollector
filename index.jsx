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

import React from 'react';
import MainView from './lib/containers/mainView';
import SidePanel from './lib/containers/sidePanel';
import * as DeviceActions from './lib/actions/deviceActions';
import { loadSettings } from './lib/actions/uiActions';
import reducers from './lib/reducers';
import './resources/css/index.scss';

/* eslint-disable react/prop-types, no-unused-vars */

const supportedBoards = ['PCA10090'];
const platform = process.platform.slice(0, 3);

// App configuration
// =================

/**
 * Configures which device types to show in the device selector, and how
 * they should be set up (programmed) when selected.
 *
 * @description Supported properties:
 * - `selectorTraits`: Configures which device types to show in the
 * device selector. The config format is described on
 * https://github.com/NordicSemiconductor/nrf-device-lister-js.
 * - `deviceSetup`: Configures which firmware to program when a device is
 * selected in the device selector. The config format is described on
 * https://github.com/NordicSemiconductor/nrf-device-setup-js.
 */
export const config = {
    selectorTraits: {
        jlink: true,
        serialport: true,
    },
};

/**
 * Temporary workaround for macOS where serialports of PCA10090 can't be properly identified yet.
 * This function returns an array of devices where any device with 3 serialports are converted
 * to 3 devices with 1 serialport each, so the user will be able to select any of the ports.
 *
 * @param {Array<device>} devices array of device-lister device objects
 * @param {bool} autoDeviceFilter indicates if functionality is desired or not toggled by the UI
 * @returns {Array<device>} fixed array
 */
function fixDevices(devices, autoDeviceFilter) {
    if (platform !== 'dar' && autoDeviceFilter) {
        return devices;
    }
    const fixedDevices = [];
    devices.forEach(device => {
        const { serialNumber } = device;
        const temp = [{ ...device }];
        let i = 1;
        while (device[`serialport.${i}`]) {
            temp[i] = {
                ...temp[0],
                serialport: { ...temp[0][`serialport.${i}`] },
                serialNumber: `${serialNumber}#${i}`,
            };
            temp[0].serialNumber = `${serialNumber}#0`;
            delete temp[0][`serialport.${i}`];
            let k = 1;
            while (temp[i][`serialport.${k}`]) {
                delete temp[i][`serialport.${k}`];
                k += 1;
            }
            i += 1;
        }
        fixedDevices.push(...temp);
    });
    return fixedDevices;
}

// Component decoration
// ====================

export function mapDeviceSelectorState(state, props) {
    return {
        autoDeviceFilter: state.app.ui.autoDeviceFilter,
        portIndicatorStatus: (state.app.device.deviceName !== null) ? 'on' : 'off',
        ...props,
    };
}

/**
 * Decorates the core DeviceSelector component, which is rendered in the
 * top left corner of the app. See:
 * https://github.com/NordicSemiconductor/pc-nrfconnect-core/blob/master/lib/windows/app/components/DeviceSelector.jsx
 *
 * @param {Function} DeviceSelector The core DeviceSelector component.
 * @returns {Function} A new React component.
 */
export function decorateDeviceSelector(DeviceSelector) {
    return props => {
        const { devices, autoDeviceFilter, ...rest } = props;
        const filteredDevices = autoDeviceFilter
            ? devices.filter(d => supportedBoards.includes(d.boardVersion))
            : devices;
        const fixedDevices = fixDevices(filteredDevices, autoDeviceFilter);
        return <DeviceSelector {...rest} devices={fixedDevices} />;
    };
}

/**
 * Decorates the core MainView component, which is the empty area below
 * the NavBar and above the LogViewer. See:
 * https://github.com/NordicSemiconductor/pc-nrfconnect-core/blob/master/lib/windows/app/components/MainView.jsx
 *
 * @param {Function} MainView The core MainView component.
 * @returns {Function} A new React component.
 */
export function decorateMainView() {
    return props => (
        <MainView {...props} />
    );
}

/**
 * Decorates the core SidePanel component, which is the empty area
 * rendered to the right of the app. See:
 * https://github.com/NordicSemiconductor/pc-nrfconnect-core/blob/master/lib/windows/app/components/SidePanel.jsx
 *
 * @param {Function} SidePanel The core SidePanel component.
 * @returns {Function} A new React component.
 */
export function decorateSidePanel() {
    return props => (
        <SidePanel {...props} />
    );
}

// Adding information to state
// ===========================

/**
 * Redux reducer for the app. Receives the current state object and an
 * action, and returns a new state.
 *
 * @param {Object} state The Redux state object.
 * @param {Object} action A Redux action object.
 * @returns {Object} A new Redux state object.
 */
export const reduceApp = reducers;

/**
 * Pick the serialport that should belong to the modem on PCA10090
 * @param {Array<device>} serialports array of device-lister serialport objects
 * @returns {object} the selected serialport object
 */
function pickSerialPort(serialports) {
    if (serialports.length === 1) {
        // In macOS case when serialports are split
        return serialports[0];
    }
    switch (platform) {
        case 'win':
            return serialports.find(s => (/MI_04/.test(s.pnpId)));
        case 'lin':
            return serialports.find(s => (/-if04$/.test(s.pnpId)));
        case 'dar':
            // this doesn't work, but with fixDevices() can't happen
            break;
        default:
    }
    return undefined;
}

// Intercepting actions with middleware
// ====================================

/**
 * A custom Redux middleware that can intercept any action. The
 * middleware is invoked after an action has been dispatched, but before
 * it reaches the reducers. See https://redux.js.org/advanced/middleware.
 *
 * This is useful e.g. when the app wants to perform some asynchronous
 * operation when a core action is dispatched. To see which core actions
 * may be intercepted, see:
 * https://github.com/NordicSemiconductor/pc-nrfconnect-core/tree/master/lib/windows/app/actions
 *
 * Note that the Redux store has a `dispatch` function for dispatching
 * actions, and a `getState` function for getting the state object.
 *
 * @param {Object} store The Redux store.
 * @returns {Function} The Redux middleware implementation.
 */
export function middleware(store) {
    return next => action => {
        if (!action) {
            return;
        }

        if (action.type === 'DEVICE_SELECTED') {
            const { device } = action;
            const serialports = Object.keys(device)
                .filter(k => k.startsWith('serialport'))
                .map(k => device[k]);

            const serialport = pickSerialPort(serialports);
            if (serialport) {
                store.dispatch(DeviceActions.open(serialport));
            }
        }
        if (action.type === 'DEVICE_DESELECTED') {
            store.dispatch(DeviceActions.close());
        }

        next(action);
    };
}

export function onReady(dispatch, getState) {
    dispatch(loadSettings());
}
