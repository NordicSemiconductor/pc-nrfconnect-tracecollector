/*
 * Copyright (c) 2015 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import React from 'react';
import renderer from 'react-test-renderer';

import MainView from '../MainView';

describe('MainView', () => {
    it('should render component', () => {
        expect(
            renderer.create(
                <MainView
                    isConnected
                    bytesWritten={0}
                    freeDiskSpace={1000}
                    totalDiskSpace={2000}
                    filePath="/path/to/file"
                />
            )
        ).toMatchSnapshot();
    });
});
