import { defineConfig } from "eslint/config";
import tsParser from "@typescript-eslint/parser";
import typescriptEslintPlugin from "@typescript-eslint/eslint-plugin";
import prettierPlugin from "eslint-plugin-prettier";

export default defineConfig([
  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module",
      },
      globals: {
        node: true,
        es2021: true,
      },
    },

    plugins: {
      "@typescript-eslint": typescriptEslintPlugin,
      prettier: prettierPlugin,
    },

    rules: {
      ...typescriptEslintPlugin.configs.recommended.rules,
      "prettier/prettier": "error",
    },
  },
]);