module.exports = {
  root: true,
  "parserOptions": {
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  extends: [
  ],
  parser: 'typescript-eslint-parser',
  plugins: [
  'react',
  'typescript'
  ],
  'settings': {},
  rules: {
  "indent": ["error", 2]
  }
}