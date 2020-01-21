module.exports = (api) => ({
    exclude: 'node_modules/**',
    presets: [['@babel/preset-env', { modules: api.env('test') ? 'cjs' : false, loose: false }]],
    plugins: [
        '@babel/plugin-proposal-class-properties',
    ],
});
