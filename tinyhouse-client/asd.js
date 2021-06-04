module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2020
  },
  env: {
    node: true
  },
  plugins: [
    '@typescript-eslint'
  ],
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  rules: {
    'promise/param-names': 'off',
    // https://github.com/eslint/eslint/issues/13957
    indent: 'off'
  }
}
