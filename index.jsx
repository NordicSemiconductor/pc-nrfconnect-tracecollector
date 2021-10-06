/*
 * Copyright (c) 2015 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import React from 'react';
import { logger } from 'nrfconnect/core';

import * as DeviceActions from './lib/actions/deviceActions';
import { loadSettings } from './lib/actions/uiActions';
import MainView from './lib/containers/mainView';
import SidePanel from './lib/containers/sidePanel';
import reducers from './lib/reducers';

import './resources/css/index.scss';

/* eslint-disable react/prop-types, no-unused-vars */

const supportedBoards = ['PCA10090', 'PCA20035', 'THINGY91'];

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
        serialport: true,
    },
};

// Component decoration
// ====================

export function mapDeviceSelectorState(state, props) {
    return {
        autoDeviceFilter: state.app.ui.autoDeviceFilter,
        portIndicatorStatus:
            state.app.device.deviceName !== null ? 'on' : 'off',
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
        return <DeviceSelector {...rest} devices={filteredDevices} />;
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
    return props => <MainView {...props} />;
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
    return props => <SidePanel {...props} />;
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
export function middleware({ dispatch }) {
    return next => action => {
        if (!action) {
            return;
        }

        if (action.type === 'DEVICE_SELECTED') {
            const serialport = action.device.serialPorts.slice(-1)[0];
            if (serialport) {
                dispatch(DeviceActions.open(serialport.comName));
            } else {
                logger.error("Couldn't identify serial port");
                dispatch({ type: 'DEVICE_DESELECTED' });
                return;
            }
        }
        if (action.type === 'DEVICE_DESELECTED') {
            dispatch(DeviceActions.close());
        }

        next(action);
    };
}

export function onReady(dispatch, getState) {
    dispatch(loadSettings());
}
