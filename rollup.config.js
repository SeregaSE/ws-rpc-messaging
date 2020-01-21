const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
const resolve = require('rollup-plugin-node-resolve')
const { terser } = require('rollup-plugin-terser');
const { sizeSnapshot } = require('rollup-plugin-size-snapshot')

module.exports = [
    {
        input: './src/index.js',

        external: ['uuid/v4', 'ws'],

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
                presets: [
                    [
                        '@babel/preset-env',
                        {
                            modules: false,
                            targets: {
                                node: true,
                            },
                        }
                    ]
                ],
                plugins: [
                    // '@babel/plugin-transform-modules-commonjs',
                    '@babel/plugin-proposal-class-properties',
                ]
            }),
            sizeSnapshot()
        ],

        output: {
            file: 'lib/index.js',
            format: 'cjs'
        }
    },

    {
        input: './src/browser-websocket.js',

        globals: {
            WebSocket: 'WebSocket'
        },

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
            sizeSnapshot()
        ],

        output: [
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
        ]
    }
];