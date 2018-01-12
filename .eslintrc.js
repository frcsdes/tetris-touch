// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  "rules": {
    // allow paren-less arrow functions
    "arrow-parens": 0,
    // allow async-await
    "generator-star-spacing": 0,
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
    "no-trailing-spaces": ["warn"],
    "no-tabs": 0,
    "indent": ["error", "tab"],
    "quotes": ["warn", "double", { "allowTemplateLiterals": true }],
    "semi": ["error", "always"],
    "curly": ["warn", "multi-or-nest"],
    "no-unused-vars": ["warn"],
    "no-multi-spaces": ["error", {
      "exceptions": {
        "Property": true,
        "BinaryExpression": true,
        "VariableDeclarator": true,
        "ObjectExpression": true,
        "CallExpression": true,
        "ImportDeclaration": true
      }
    }],
    "no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
    "key-spacing": ["warn", {
      "afterColon": true,
      "beforeColon": false,
      "mode": "minimum"
    }],
    "comma-dangle": ["error", {
      "arrays": "always-multiline",
      "objects": "always-multiline",
      "imports": "never",
      "exports": "never",
      "functions": "ignore"
    }],
    "yoda": ["warn", "never", {"exceptRange": true}]
  }
}
