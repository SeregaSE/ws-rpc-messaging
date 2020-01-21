const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
const resolve = require('rollup-plugin-node-resolve')
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
                file: 'lib/ws-rpc-messaging.cjs.js',
                format: 'cjs'
            },
            {
                file: 'lib/ws-rpc-messaging.cjs.min.js',
                format: 'cjs',
                plugins: [terser()]
            },
            {
                file: 'lib/ws-rpc-messaging.js',
                format: 'iife',
                name: 'RPCClient',
            },
            {
                file: 'lib/ws-rpc-messaging.min.js',
                format: 'iife',
                name: 'RPCClient',
                plugins: [terser()]
            },
        ],
        plugins: [
            resolve({
                browser: true
            }),
            babel({
                babelrc: false,
                exclude: 'node_modules/**',
                presets: [['@babel/preset-env', { modules: false, loose: false }]],
                plugins: [
                    '@babel/plugin-proposal-class-properties',
                ]
            }),
            commonjs(),
            sizeSnapshot()        ],
    }
];