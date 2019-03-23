---
  to: packages/<%=type%>/<%=name%>/src/index-test.js
---
const entry = require('./index');

test('it should run without errors', () => {
    expect(entry).not.toThrow();
});
