module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2021
  },
  env: {
    "es2021": true,
    "node": true
  },
  plugins: [
    '@typescript-eslint'
  ],
  extends: [
    'plugin:vue/vue3-recommended',
    '@vue/typescript/recommended'
  ],
  rules: {
    'promise/param-names': 'off',
    // https://github.com/eslint/eslint/issues/13957
    indent: 'off',
    'vue/require-default-prop': 'off'
  }
}
