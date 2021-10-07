/*
 * Copyright (c) 2015 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Group, SidePanel as SharedSidepanel } from 'pc-nrfconnect-shared';
import PropTypes from 'prop-types';

const SidePanel = ({
    isConnected,
    running,
    toggleCapture,
    autoDeviceFilter,
    autoDeviceFilterToggled,
    filePath,
    showItemInFolder,
}) => (
    <SharedSidepanel>
        <Group heading="Serialport Trace Capture">
            Copy this over from the CM {/* FIXME */}
        </Group>
        <Group heading="Capture">
            <div className="d-flex flex-column">
                <Button
                    className="capture"
                    variant={running ? 'danger' : 'primary'}
                    size="lg"
                    onClick={toggleCapture}
                    disabled={!isConnected}
                >
                    {running ? 'Stop' : 'Start'} Capture
                </Button>
                <Button
                    onClick={showItemInFolder}
                    disabled={!filePath}
                    variant="light"
                >
                    Show capture in folder
                </Button>
            </div>
        </Group>
        <Group heading="Device filter">
            <Form.Group controlId="portFilterCheck">
                <Form.Check
                    type="checkbox"
                    onChange={e => autoDeviceFilterToggled(e.target.checked)}
                    checked={autoDeviceFilter}
                    label="Show only supported devices"
                />
            </Form.Group>
        </Group>
    </SharedSidepanel>
);

SidePanel.propTypes = {
    isConnected: PropTypes.bool.isRequired,
    running: PropTypes.bool.isRequired,
    toggleCapture: PropTypes.func.isRequired,
    autoDeviceFilter: PropTypes.bool.isRequired,
    autoDeviceFilterToggled: PropTypes.func.isRequired,
    filePath: PropTypes.string,
    showItemInFolder: PropTypes.func.isRequired,
};

SidePanel.defaultProps = {
    filePath: null,
};

export default SidePanel;
