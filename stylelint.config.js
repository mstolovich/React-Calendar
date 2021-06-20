// stylelint.config.js
const prettierConfig = require("./prettier.config.js");

// Transform from snake-case to TitleCase
const titleCase = str => str.replace(/(-|^)([^-]?)/g, (match, _, char) => char.toUpperCase());

// Given a component name in snake-case, returns a regex. The regex
// must match CSS selectors conforming to the BEM naming conventions
// you want to enforce.
const customBemSelector = component => {
  const block = titleCase(component);
  const kebabCase = "[a-z][a-zA-Z0-9]*";
  const element = `(?:_${kebabCase})?`;
  const modifier = `(?:___${kebabCase})?`;
  const attribute = "(?:\\[.+\\])?";
  return new RegExp(`^\\.${block}${element}${modifier}${attribute}$`);
};

module.exports = {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-rational-order",
    "stylelint-config-css-modules",
    "stylelint-config-prettier"
  ],
  plugins: [
    "stylelint-prettier",
    "stylelint-selector-bem-pattern",
    "stylelint-order",
    "stylelint-config-rational-order/plugin",
    "stylelint-order"
  ],
  rules: {
    "prettier/prettier": [true, prettierConfig],
    "plugin/selector-bem-pattern": {
      // Derive component names from the file name
      implicitComponents: true,
      // Use the default BEM preset
      preset: "bem",
      // Configures the valid selectors
      componentSelectors: {
        initial: customBemSelector,
      },
      // We allow any custom property (CSS var) names
      ignoreCustomProperties: ".*",
    },
    "plugin/rational-order": [true, {
      "border-in-box-model": false,
      "empty-line-between-groups": false,
    }],
    "order/order": [
      "custom-properties",
      "declarations"
    ],
    "order/properties-order": [
      "width",
      "height"
    ]
  },
};