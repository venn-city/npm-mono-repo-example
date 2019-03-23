#!/usr/bin/env node
const chalk = require("chalk");
const { execSync } = require("child_process");
const fs = require("fs");
const [, , ...commandsWordsArray] = process.argv;
const scriptToExecute = commandsWordsArray
  .map(escapeVariableArguments)
  .join(" ");
console.log(
  chalk.green("About to execute script: " + chalk.yellow(scriptToExecute))
);
const changedPackages = getChangedPackages().map(obj => obj.name);
if (!changedPackages.length) {
  console.log(chalk.yellow("No changed packages found, skipping execution."));
  return;
}
console.log(
  chalk.green(
    "Executing command on the following packages: " +
      chalk.yellow(changedPackages.join(","))
  )
);
execSync(
  `${scriptToExecute} ${changedPackages
    .map(name => `--scope ${name}`)
    .join(" ")}`,
  { stdio: "inherit" }
);

function getChangedPackages() {
  // for CI, we don't want the changes occurring on the CI will affect changes calculation, the CI will save initial changes output to lerna-changed.lock
  if (fs.existsSync("./lerna-changed.temp")) {
    console.log(
      chalk.yellow("found lerna-changed.lock, deducting changes based on it.")
    );
    const changesFromFile = fs.readFileSync("./lerna-changed.temp");
    if (!changesFromFile.length) {
      return [];
    }
    const changedPackages = JSON.parse(changesFromFile);
    return changedPackages;
  }
  // otherwise decide changes based on lerna changed as usual
  try {
    const changedPackagesRawText = execSync("lerna changed --json");
    const changedPackages = JSON.parse(changedPackagesRawText.toString());
    return changedPackages;
  } catch (error) {
    if (error.toString().includes("No changed packages found")) {
      return [];
    } else {
      process.exit(1);
    }
  }
}

function escapeVariableArguments(arg) {
  return arg.replace(/\$/g, "\\$");
}
