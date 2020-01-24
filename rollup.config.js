const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');
const { terser } = require('rollup-plugin-terser');
const { sizeSnapshot } = require('rollup-plugin-size-snapshot');

const cjsConfig = (input, output) => ({
    input,

    external: ['uuid/v4', 'ws'],

    plugins: [
        resolve({
            customResolveOptions: {
                moduleDirectory: 'node_modules',
            },
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
                    },
                ],
            ],
            plugins: ['@babel/plugin-proposal-class-properties'],
        }),
    ],

    output: {
        file: output,
        format: 'cjs',
    },
});

module.exports = [
    cjsConfig('./src/index.js', 'lib/index.js'),
    cjsConfig('./src/browser-rpc-websocket.js', 'lib/browser.js'),

    {
        input: './src/browser-rpc-websocket.js',

        globals: {
            WebSocket: 'WebSocket',
        },

        plugins: [
            resolve({
                browser: true,
            }),
            babel(),
            commonjs(),
            sizeSnapshot(),
        ],

        output: [
            {
                file: 'lib/ws-rpc-messaging.js',
                format: 'iife',
                name: 'RPCWebSocket',
            },
            {
                file: 'lib/ws-rpc-messaging.min.js',
                format: 'iife',
                name: 'RPCWebSocket',
                plugins: [terser()],
            },
        ],
    },
];
