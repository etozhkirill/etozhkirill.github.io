module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-css-modules',
    'stylelint-config-prettier'
  ],
  plugins: [
    'stylelint-config-rational-order/plugin',
    'stylelint-order',
    'stylelint-prettier',
    'stylelint-scss'
  ],
  rules: {
    'at-rule-no-unknown': null,
    'no-empty-source': null,
    'order/properties-order': [],
    'plugin/rational-order': true,
    'prettier/prettier': true,
    'scss/at-rule-no-unknown': true
  }
};
