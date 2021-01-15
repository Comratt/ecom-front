/* eslint-disable */
const path = require('path');
const { override, addWebpackAlias, disableEsLint } = require('customize-cra');

module.exports = override(
    addWebpackAlias({
        ['@']: path.resolve(__dirname, 'src'),
    }),
    disableEsLint(),
);
