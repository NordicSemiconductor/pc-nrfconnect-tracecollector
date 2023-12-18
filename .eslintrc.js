/*
 * Copyright (c) 2023 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

const sharedConfig = require('pc-nrfconnect-shared/config/eslintrc');

module.exports = {
    ...sharedConfig,
    ignorePatterns: [...sharedConfig.ignorePatterns, 'doc/docs/'],
};
