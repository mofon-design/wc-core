module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  rules: {
    'consistent-return': 0,
    'no-bitwise': 0,
    'no-continue': 0,
    'no-nested-ternary': 0,
    'no-restricted-syntax': 0,
    'no-unused-expressions': 0,
    'prefer-destructuring': 0,
    'import/no-named-as-default': 0,
    'react/no-unknown-property': 0,
  },
  settings: {
    react: {
      pragma: 'MDWC',
    },
  },
};
