const { terser } = require('rollup-plugin-terser');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');
const { sizeSnapshot } = require('rollup-plugin-size-snapshot');

module.exports = [
    {
        input: './src/index.js',
        output: {
            file: 'lib/index.js',
            format: 'cjs'
        },
        plugins: [
            resolve(),
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
        output: {
            file: 'lib/browser.js',
            format: 'iife',
        },
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
            // terser(),
            sizeSnapshot()
        ],
    }
];