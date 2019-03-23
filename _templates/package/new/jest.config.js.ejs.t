---
  to: packages/<%=type%>/<%=name%>/jest.config.js
---
module.exports = {
  setupTestFrameworkScriptFile: './jest.setup.js',
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*)(-test).js?(x)'],
  testEnvironment: 'node',
  coverageReporters: ['json-summary', 'json', 'lcov', 'text', 'clover'],
  coveragePathIgnorePatterns: ['src./test/.', '.jest.js'],
  reporters: ['default', 'jest-junit']
};
