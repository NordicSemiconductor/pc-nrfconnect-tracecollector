/*
 * Copyright (c) 2015 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { connect } from 'react-redux';

import MainView from '../components/MainView';

export default connect(state => ({
    isConnected: !!state.app.device.deviceName,
    ...state.app.capture,
}))(MainView);
