/*
 * Copyright (c) 2015 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bool } from 'prop-types';

import * as DeviceActions from '../actions/deviceActions';
import Dropdown from './Dropdown';

const truncateMiddle = (str, clipStart = 20, clipEnd = 13) => {
    const clipStartWithEllipsis = clipStart + 3;
    if (str.length <= clipStartWithEllipsis) {
        return str;
    }
    const rightHandStartingPoint =
        str.length - Math.min(clipEnd, str.length - clipStartWithEllipsis);
    return `${str.substr(0, clipStart)}...${str.substr(
        rightHandStartingPoint,
        str.length
    )}`;
};

const Serialports = ({ disabled }) => {
    const dispatch = useDispatch();
    const { deviceName, availablePorts } = useSelector(
        state => state.app.device
    );

    const updateSerialPort = (_port, index) => {
        dispatch(DeviceActions.open(availablePorts[index]));
    };

    return (
        <Dropdown
            disabled={disabled}
            onSelect={updateSerialPort}
            selectedIndex={availablePorts.indexOf(deviceName)}
            items={availablePorts.map(port => truncateMiddle(port, 20, 8))}
        />
    );
};

Serialports.propTypes = {
    disabled: bool.isRequired,
};

export default Serialports;
