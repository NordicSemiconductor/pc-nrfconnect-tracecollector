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

import { combineReducers } from 'redux';
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
});

export default rootReducer;
