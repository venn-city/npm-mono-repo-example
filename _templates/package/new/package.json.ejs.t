---
  to: packages/<%=type%>/<%=name%>/package.json
---
{
  "name": "@YOUR_COMPANY_SCOPE/<%=name%>",
  "version": "1.0.0",
  "author": "Your Company",
  "main": "src/index.js",
  "dependencies": {},
  "scripts": {
    "test": "jest",
    "coverage": "jest --coverage",
    "build": "npm install",
    "test:watch": "npm run test -- --watchAll",
    "lint": "npx eslint --fix .",
    "test:ci": "jest --ci --reporters=default --reporters=jest-junit --runInBand --coverage",
    "lint:ci": "npx eslint . --format junit -o $LINT_JUNIT_OUTPUT"
  },
  "devDependencies": {
      "eslint": "^5.5.0",
      "eslint-config-airbnb-base": "^13.1.0",
      "eslint-plugin-import": "^2.14.0",
      "husky": "^1.1.3",
      "jest": "^23.4.2",
      "jest-junit": "^5.2.0",
      "lint-staged": "^8.0.4",
      "sinon": "^7.1.1"
    }
}