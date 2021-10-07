/*
 * Copyright (c) 2015 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import Store from 'electron-store';

const persistentStore = new Store({ name: 'pc-nrfconnect-tracecollector' });

export const AUTO_DEVICE_FILTER_TOGGLED = 'AUTO_DEVICE_FILTER_TOGGLED';

export function autoDeviceFilterToggledAction(autoDeviceFilter) {
    persistentStore.set('autoDeviceFilter', !!autoDeviceFilter);
    return {
        type: AUTO_DEVICE_FILTER_TOGGLED,
        autoDeviceFilter: !!autoDeviceFilter,
    };
}

function loadAndDispatch(key, defaultValue, action) {
    return dispatch => {
        if (!persistentStore.has(key)) {
            persistentStore.set(key, defaultValue);
        }
        dispatch(action(persistentStore.get(key)));
    };
}

export function loadSettings() {
    return dispatch => {
        dispatch(
            loadAndDispatch(
                'autoDeviceFilter',
                true,
                autoDeviceFilterToggledAction
            )
        );
    };
}

// FIXME: loadSettings is not called anymore. Change this to load the settings automatically in uiReducer for the initial state
