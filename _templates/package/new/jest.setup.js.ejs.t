---
  to: packages/<%=type%>/<%=name%>/jest.setup.js
---
process.env.IS_TEST = true;

jest.setTimeout(10000);
