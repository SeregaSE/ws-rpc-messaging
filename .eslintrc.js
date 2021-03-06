module.exports = {
  env: {
    commonjs: true,
    es6: true,
    jest: true,
  },
  extends: [
    'airbnb-base'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    'no-continue': 0,
    'no-param-reassign': 0,
    'no-underscore-dangle': 0,
    indent: ['error', 4],
  }
};
