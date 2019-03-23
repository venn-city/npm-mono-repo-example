module.exports = [
  {
    type: "input",
    name: "name",
    message: "What's your package name?"
  },
  {
    type: "select",
    name: "type",
    message: "What's your package type? it will be distributed for?",
    choices: ["ui", "server", "crossPlatform"]
  },
  {
    type: "input",
    name: "oneliner",
    message: "Please provide a one line description for this package"
  },
  {
    type: "input",
    name: "description",
    message:
      "(optional) Please provide a paragraph that describes this package in more details."
  }
];
