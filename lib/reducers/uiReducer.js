/*
 * Copyright (c) 2015 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import Store from 'electron-store';

import { AUTO_DEVICE_FILTER_TOGGLED } from '../actions/uiActions';

const persistentStore = new Store({ name: 'pc-nrfconnect-tracecollector' });

const initialState = () => ({
    autoDeviceFilter: persistentStore.get('autoDeviceFilter', true),
});

export default function reducer(state = initialState(), action) {
    switch (action.type) {
        case AUTO_DEVICE_FILTER_TOGGLED: {
            const { autoDeviceFilter } = action;
            persistentStore.set('autoDeviceFilter', !!autoDeviceFilter);
            return {
                ...state,
                autoDeviceFilter,
            };
        }
        default:
    }
    return state;
}
