/* Copyright (c) 2015 - 2017, Nordic Semiconductor ASA
 *
 * All rights reserved.
 *
 * Use in source and binary forms, redistribution in binary form only, with
 * or without modification, are permitted provided that the following conditions
 * are met:
 *
 * 1. Redistributions in binary form, except as embedded into a Nordic
 *    Semiconductor ASA integrated circuit in a product or a software update for
 *    such product, must reproduce the above copyright notice, this list of
 *    conditions and the following disclaimer in the documentation and/or other
 *    materials provided with the distribution.
 *
 * 2. Neither the name of Nordic Semiconductor ASA nor the names of its
 *    contributors may be used to endorse or promote products derived from this
 *    software without specific prior written permission.
 *
 * 3. This software, with or without modification, must only be used with a Nordic
 *    Semiconductor ASA integrated circuit.
 *
 * 4. Any software provided in binary form under this license must not be reverse
 *    engineered, decompiled, modified and/or disassembled.
 *
 * THIS SOFTWARE IS PROVIDED BY NORDIC SEMICONDUCTOR ASA "AS IS" AND ANY EXPRESS OR
 * IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY, NONINFRINGEMENT, AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL NORDIC SEMICONDUCTOR ASA OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR
 * TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 * THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
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
