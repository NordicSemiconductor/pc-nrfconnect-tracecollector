/*
 * Copyright (c) 2015 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

export const AUTO_DEVICE_FILTER_TOGGLED = 'AUTO_DEVICE_FILTER_TOGGLED';

export const autoDeviceFilterToggledAction = autoDeviceFilter => ({
    type: AUTO_DEVICE_FILTER_TOGGLED,
    autoDeviceFilter: !!autoDeviceFilter,
});
