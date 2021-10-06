/*
 * Copyright (c) 2015 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { AUTO_DEVICE_FILTER_TOGGLED } from '../actions/uiActions';

const initialState = {
    autoDeviceFilter: true,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case AUTO_DEVICE_FILTER_TOGGLED: {
            const { autoDeviceFilter } = action;
            return {
                ...state,
                autoDeviceFilter,
            };
        }
        default:
    }
    return state;
}
