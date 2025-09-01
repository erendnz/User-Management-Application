import pluginPrettier from "eslint-plugin-prettier";
import pluginJsxA11y from "eslint-plugin-jsx-a11y";
import pluginImport from "eslint-plugin-import";
import configPrettier from "eslint-config-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      prettier: pluginPrettier,
      jsxA11y: pluginJsxA11y,
      import: pluginImport,
    },
    rules: {
      // Prettier rules
      "prettier/prettier": "warn",

      //Accessibiliaty
      "jsx-a11y/anchor-is-valid": "warn",
      "jsx-a11y/no-autofocus": "warn",
      "jsx-a11y/alt-text": "warn",

      // Import order
      "import/order": [
        "warn",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          "newlines-between": "always",
        },
      ],
      "import/no-unresolved": "warn",
      "import/no-duplicates": "warn",
    },
  },

  // Close rules crashing prettifier
  configPrettier,
]);
