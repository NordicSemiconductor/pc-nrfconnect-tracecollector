/*
 * Copyright (c) 2015 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { combineReducers } from 'redux';
import ui from './uiReducer';
import {
    DEVICE_OPENED, DEVICE_CLOSED, CAPTURE_TOGGLED, CAPTURE_STATS,
} from '../actions/deviceActions';

const initialDeviceState = {
    deviceName: null,
};

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
            return initialDeviceState;
        }
        case CAPTURE_TOGGLED: {
            return {
                ...state,
                captureRunning: !!action.running,
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
