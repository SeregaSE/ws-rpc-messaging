const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
const resolve = require('rollup-plugin-node-resolve')
const visualizer = require('rollup-plugin-visualizer')
const { terser } = require('rollup-plugin-terser');
const { sizeSnapshot } = require('rollup-plugin-size-snapshot')

module.exports = [
    {
        input: './src/index.js',
        output: {
            file: 'lib/index.js',
            format: 'cjs'
        },
        plugins: [
            resolve({
                // pass custom options to the resolve plugin
                customResolveOptions: {
                    moduleDirectory: 'node_modules'
                }
            }),
            babel({
                babelrc: false,
                exclude: 'node_modules/**',
                presets: [['@babel/preset-env', { modules: false }]],
                plugins: [
                    '@babel/plugin-proposal-class-properties',
                ]
            }),
            sizeSnapshot()
        ],
        external: ['uuid/v4']
    },
    {
        input: './src/browser.js',
        output: [
            {
                file: 'lib/ws-rpc-messaging.esm.js',
                format: 'esm'
            },
            {
                file: 'lib/ws-rpc-messaging.esm.min.js',
                format: 'esm',
                plugins: [terser(), visualizer()]
            },
            {
                file: 'lib/ws-rpc-messaging.js',
                format: 'iife',
            },
            {
                file: 'lib/ws-rpc-messaging.min.js',
                format: 'iife',
                plugins: [terser()]
            },
        ],
        plugins: [
            resolve(),
            babel({
                babelrc: false,
                exclude: 'node_modules/**',
                presets: [['@babel/preset-env', { modules: false, loose: false }]],
                plugins: [
                    '@babel/plugin-proposal-class-properties',
                ]
            }),
            commonjs(),
            sizeSnapshot()
        ],
    }
];