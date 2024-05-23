const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "eslint:recommended",
    "prettier",
    "eslint-config-turbo",
  ],
  plugins: ["only-warn"],
  globals: {
    Bun: true,
  },
  env: {
    node: true,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: [
    // Ignore dotfiles
    ".*.js",
    "node_modules/",
    "dist/",
  ],
  overrides: [
    {
      files: ["*.js?(x)", "*.ts?(x)"],
    },
  ],
  rules: {
    // other rules...
    "no-unused-vars": ["error", {
      "argsIgnorePattern": "^_", // Ignore parameters that start with an underscore
      "ignoreRestSiblings": true,
      "varsIgnorePattern": "^_" // Optionally, ignore variables that start with an underscore
    }]
  }
};
