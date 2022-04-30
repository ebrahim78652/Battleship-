module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb-base"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    quotes: "off",
    "no-underscore-dangle": "off",
    "no-unused-vars": "off",
    "import/prefer-default-export": "off",
    "linebreak-style": "off",
  },
};
