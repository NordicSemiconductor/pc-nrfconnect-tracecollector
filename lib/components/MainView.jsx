/*
 * Copyright (c) 2015 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import { basename } from 'path';
import prettyBytes from 'pretty-bytes';
import PropTypes from 'prop-types';

const informationPanel = (
    <>
        <Alert variant="warning" style={{ flexDirection: 'column' }}>
            <p>
                <em>Deprecation notice</em>
            </p>
            <p>
                nRF Connect for Desktop <strong>Cellular Monitor</strong> app
                has been released. This provides the same functionality as Trace
                Collector and Link Monitor, and supports many new features,
                including PCAP format trace for use in third-party applications
                such as Wireshark. We recommend you try it out.
            </p>

            <p>
                <strong>Cellular Monitor</strong> is installed from{' '}
                <strong>nRF Connect for Desktop</strong>.
            </p>
        </Alert>
        <Alert variant="info">
            Open the DevKit in <i>Select device</i> menu.
        </Alert>
    </>
);

const MainView = ({
    isConnected,
    bytesWritten,
    freeDiskSpace,
    totalDiskSpace,
    filePath,
}) => (
    <div className="main-view-container">
        <div className="main-view">
            {!isConnected && informationPanel}
            {isConnected && (
                <Card className="content" variant="primary">
                    <div className="stats">
                        {freeDiskSpace && (
                            <p>
                                Disk space: {prettyBytes(freeDiskSpace)} free of{' '}
                                {prettyBytes(totalDiskSpace)}
                            </p>
                        )}
                        {bytesWritten && (
                            <p>Trace size: {prettyBytes(bytesWritten)}</p>
                        )}
                        {filePath && (
                            <p>
                                Latest tracefile:&nbsp;
                                {basename(filePath)}
                            </p>
                        )}
                    </div>
                </Card>
            )}
        </div>
    </div>
);

MainView.propTypes = {
    isConnected: PropTypes.bool.isRequired,
    bytesWritten: PropTypes.number,
    freeDiskSpace: PropTypes.number,
    totalDiskSpace: PropTypes.number,
    filePath: PropTypes.string,
};

MainView.defaultProps = {
    bytesWritten: null,
    freeDiskSpace: null,
    totalDiskSpace: null,
    filePath: null,
};

export default MainView;
