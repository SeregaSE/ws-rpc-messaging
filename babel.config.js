module.exports = {
    exclude: 'node_modules/**',
    presets: [['@babel/preset-env', { modules: false, loose: false }]],
    plugins: [
        '@babel/plugin-proposal-class-properties',
    ],
};
