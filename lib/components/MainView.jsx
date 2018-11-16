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
import { Alert, Button, Panel } from 'react-bootstrap';
import { basename } from 'path';
import prettyBytes from 'pretty-bytes';

const informationPanel = (
    <Alert bsStyle="info">
        Open the DevKit in <i>Select device</i> menu.
    </Alert>
);

const MainView = ({
    isConnected,
    running,
    toggleCapture,
    bytesWritten,
    freeDiskSpace,
    totalDiskSpace,
    filePath,
    showItemInFolder,
}) => (
    <div className="core-main-view">
        { !isConnected && informationPanel }
        { isConnected &&
            <Panel className="content" bsStyle="primary">
                <Button
                    className="capture"
                    bsStyle={running ? 'danger' : 'success'}
                    onClick={toggleCapture}
                >
                    { running ? 'Stop' : 'Start' } Capture
                </Button>
                <div className="stats">
                    { freeDiskSpace &&
                        <p>Disk space: { prettyBytes(freeDiskSpace) } free
                            of { prettyBytes(totalDiskSpace) }</p>
                    }
                    { bytesWritten &&
                        <p>Trace size: { prettyBytes(bytesWritten) }</p>
                    }
                    { filePath &&
                        <p>Latest tracefile:&nbsp;
                            { basename(filePath) }
                        </p>
                    }
                    { filePath &&
                        <Button onClick={showItemInFolder}>
                            Show in folder
                        </Button>
                    }
                </div>
            </Panel>
        }
    </div>
);

MainView.propTypes = {
    isConnected: PropTypes.bool.isRequired,
    running: PropTypes.bool.isRequired,
    toggleCapture: PropTypes.func.isRequired,
    bytesWritten: PropTypes.number,
    freeDiskSpace: PropTypes.number,
    totalDiskSpace: PropTypes.number,
    filePath: PropTypes.string,
    showItemInFolder: PropTypes.func.isRequired,
};

MainView.defaultProps = {
    bytesWritten: null,
    freeDiskSpace: null,
    totalDiskSpace: null,
    filePath: null,
};

export default MainView;
