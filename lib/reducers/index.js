/*
 * Copyright (c) 2015 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { combineReducers } from 'redux';

import {
    AVAILABLE_PORTS,
    CAPTURE_STATS,
    CAPTURE_TOGGLED,
    DEVICE_CLOSED,
    DEVICE_OPENED,
} from '../actions/deviceActions';
import ui from './uiReducer';

const initialDeviceState = {
    deviceName: null,
    availablePorts: [],
};

// eslint-disable-next-line default-param-last
function device(state = initialDeviceState, action) {
    switch (action.type) {
        case DEVICE_OPENED: {
            const { deviceName } = action;
            return {
                ...state,
                deviceName,
            };
        }
        case DEVICE_CLOSED: {
            return {
                ...state,
                deviceName: null,
            };
        }
        case AVAILABLE_PORTS: {
            return {
                ...state,
                availablePorts: action.ports,
            };
        }
        default:
    }
    return state;
}

const initialCaptureState = {
    running: false,
    filePath: null,
    bytesWritten: null,
};

// eslint-disable-next-line default-param-last
function capture(state = initialCaptureState, action) {
    switch (action.type) {
        case DEVICE_CLOSED: {
            return initialCaptureState;
        }
        case CAPTURE_TOGGLED: {
            const { filePath, running } = action;
            return {
                ...state,
                running,
                filePath: filePath || state.filePath,
            };
        }
        case CAPTURE_STATS: {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { type, ...stats } = action;
            return {
                ...state,
                ...stats,
            };
        }
        default:
    }
    return state;
}

const rootReducer = combineReducers({
    device,
    capture,
    ui,
});

export default rootReducer;
