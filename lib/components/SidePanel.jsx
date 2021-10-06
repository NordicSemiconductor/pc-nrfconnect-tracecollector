/*
 * Copyright (c) 2015 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

const SidePanel = ({
    isConnected,
    running,
    toggleCapture,
    autoDeviceFilter,
    autoDeviceFilterToggled,
    filePath,
    showItemInFolder,
}) => (
    <div className="core-side-panel">
        <Card>
            <Card.Header>Capture</Card.Header>
            <Card.Body>
                <div className="d-flex flex-column">
                    <Button
                        className="capture"
                        variant={running ? 'danger' : 'primary'}
                        size="lg"
                        onClick={toggleCapture}
                        disabled={!isConnected}
                    >
                        { running ? 'Stop' : 'Start' } Capture
                    </Button>
                    <Button
                        onClick={showItemInFolder}
                        disabled={!filePath}
                        variant="light"
                    >
                        Show capture in folder
                    </Button>
                </div>
            </Card.Body>
        </Card>
        <Card>
            <Card.Header>Settings</Card.Header>
            <Card.Body>
                <Form.Group controlId="portFilterCheck">
                    <Form.Check
                        type="checkbox"
                        onChange={e => autoDeviceFilterToggled(e.target.checked)}
                        checked={autoDeviceFilter}
                        label="Auto device/port filter"
                    />
                </Form.Group>
            </Card.Body>
        </Card>
    </div>
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
