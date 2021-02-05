const INLINE_ELEMENTS = require('./config_utils/INLINE_ELEMENTS.json')

module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],

  parserOptions: {
    parser: 'babel-eslint',
  },

  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'vue/singleline-html-element-content-newline': 'off',
  },

  'extends': [
    'plugin:vue/recommended',
    '@vue/airbnb'
  ],

  'globals': {
    'helpCore': true
  }
};
