const craco = require('@craco/craco');
const path = require('path')
const cracoSwc = require('craco-swc');

/** @type {craco.CracoConfig} */
const config = {
    plugins: [
        { plugin: cracoSwc }
    ],
    webpack: {
        alias: {
            "~/": path.resolve('src')
        }
    }
}

module.exports = config;