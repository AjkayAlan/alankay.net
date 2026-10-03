// Stylelint config. Stylelint can lint CSS inside Astro templates too
// when `customSyntax` is set to the postcss-html parser.
export default {
  extends: ['stylelint-config-standard'],

  rules: {
    // This project uses BEM naming: .block, .block__element, .block--modifier.
    'selector-class-pattern': [
      '^[a-z][a-z0-9]*(-[a-z0-9]+)*(__[a-z0-9]+(-[a-z0-9]+)*)?(--[a-z0-9]+(-[a-z0-9]+)*)?$',
      {
        resolveNestedSelectors: true,
        message: (selector) =>
          `Expected class selector "${selector}" to be BEM-style kebab-case`,
      },
    ],

    // Ordering of selectors is authored for readability, not specificity order.
    'no-descending-specificity': null,
  },

  overrides: [
    {
      files: ['**/*.astro'],
      customSyntax: 'postcss-html',
    },
  ],
};