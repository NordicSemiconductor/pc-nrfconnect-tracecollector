/*
 * Copyright (c) 2015 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { connect } from 'react-redux';
import SidePanel from '../components/SidePanel';
import { toggleCapture, showItemInFolder } from '../actions/deviceActions';
import { autoDeviceFilterToggledAction } from '../actions/uiActions';

export default connect(
    state => ({
        isConnected: !!state.app.device.deviceName,
        autoDeviceFilter: state.app.ui.autoDeviceFilter,
        ...state.app.capture,
    }),
    dispatch => ({
        toggleCapture: () => dispatch(toggleCapture()),
        showItemInFolder: () => dispatch(showItemInFolder()),
        autoDeviceFilterToggled: autoDeviceFilter => (
            dispatch(autoDeviceFilterToggledAction(autoDeviceFilter))
        ),
    }),
)(SidePanel);
