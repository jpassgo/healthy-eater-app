module.exports = {
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: ['airbnb-typescript'],
      parserOptions: {
        project: ['./tsconfig.json'],
        "ecmaFeatures": {
          "impliedStrict": false
        },     
      },
      rules: {
        "@typescript-eslint/no-unused-vars": "warn"
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  };