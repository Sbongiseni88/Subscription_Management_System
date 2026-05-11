// This file configures ESLint, a tool that helps us find and fix errors in our code.

import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended, // Uses the standard, recommended rules for JavaScript
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: {
        // We tell ESLint that our code runs in both Node.js and Browser environments
        ...globals.node,
        ...globals.browser,
      },
    },
  },
];



