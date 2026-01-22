import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettierPlugin from "eslint-plugin-prettier";

export default defineConfig([
  // Base ESLint recommended rules
  js.configs.recommended,

  // Language + parser configuration for TS
  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module"
      },
      globals: {
        // node and ES2021 globals
        ...js.globals.node,
        ...js.globals.es2021
      }
    },
    plugins: {
      "@typescript-eslint": typescriptEslint,
      prettier: prettierPlugin
    },
    rules: {
      ...typescriptEslint.configs.recommended.rules, // TS recommended
      "prettier/prettier": "error"                  // Prettier as error
    }
  }
]);