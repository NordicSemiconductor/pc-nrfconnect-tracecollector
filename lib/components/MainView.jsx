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
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import { basename } from 'path';
import prettyBytes from 'pretty-bytes';

const informationPanel = (
    <>
        <Alert variant="info" style={{ flexDirection: 'column' }}>
            <p>A technical preview of the upcoming <b>Cellular Monitor</b> app has been released. That app provides the same functionality as Trace Collector, however, it also provides the functionality to convert some of the content of the trace files as PCAP, which can then be visualized in e.g. <em>Wireshark</em>.</p>

            <p>Give it a try by looking for <b>Cellular Monitor</b> in the list of all apps in <b>nRF Connect for Desktop</b>..</p>
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
    <div className="core-main-view">
        {!isConnected && informationPanel}
        {isConnected && (
            <Card className="content" variant="primary">
                <div className="stats">
                    {freeDiskSpace && (
                        <p>Disk space: {prettyBytes(freeDiskSpace)} free
                            of {prettyBytes(totalDiskSpace)}
                        </p>
                    )}
                    {bytesWritten && (
                        <p>Trace size: {prettyBytes(bytesWritten)}</p>
                    )}
                    {filePath && (
                        <p>Latest tracefile:&nbsp;
                            {basename(filePath)}
                        </p>
                    )}
                </div>
            </Card>
        )}
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
