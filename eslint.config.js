const tseslint = require("typescript-eslint");
const js = require("@eslint/js");

module.exports = tseslint.config(
  {
    ignores: ["node_modules/**", "zc2sitelol/**", "assets/**", "flash/**"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
  },
);
