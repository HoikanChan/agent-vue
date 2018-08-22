// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module"
  },
  env: {
    browser: true
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: "standard",
  // required to lint *.vue files
  plugins: ["vue", "html"],
  // add your custom rules here
  rules: {
    // allow paren-less arrow functions
    "arrow-parens": 0,
    // allow async-await
    "generator-star-spacing": 0,
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
    "vue/jsx-uses-vars": 2,
    "quotes": [
      "warn",
      "single" // 改成字符串必须由单引号括起来而不是双引号，'string'不报错，"string"报错
    ],
    "semi": [
      "warn",
      "never" // 改成代码结尾不再加分号，加了分号报错，不加分号不报错
    ],
    "prettier/prettier": [
      "error",
      {
        "singleQuote": true,
        "trailingComma": "none",
        "bracketSpacing": true,
        "jsxBracketSameLine": true,
        "parser": "flow"
      }
    ]
  }
};
