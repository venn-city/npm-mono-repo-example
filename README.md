# MONO NPM Packages Repo Example

## What it's all about?
This is a mono repository example, that is pretty similar to what we use at Venn.
I hope this reference can help other companies achieve similar setup.

## What's included
1. lerna & conventional commits setup
2. example of a fully automated CI\CD based on CircleCI to manage npm packages life-cycle.
3. example of how to leverage [hygen](https://www.hygen.io/), to generate new packages easily.
4. some complimentary CI scripts that can solve common problems:
  - verifyNodeVersion.js enforcing all users of the mono repo to have same node version, mainly to avoid unnecessary package-lock conflicts.
  - executeOnChanged.js a wrapper for lerna commands, to scope them to changed packages only, based on lerna changed.

## Main reasoning
Make creating new packages the easiest we can.
Any npm package added is automatically assigned to our CI\CD pipelines which automates the release of new versions.
It is powered by [lerna](https://github.com/lerna/lerna).
So if you want to understand more deeply how it works, go ahead and read their documentation.

## Packages Lifecycle
We are using `semver` to track packages changes,
Each change is being automatically documented in the package changelog.
1. A new package is being created by runing the `npm run new:package` command.
2. Each PR will have multiple commits that are going to be documented within the changelog.
3. A merge to master will generate a new version for the package and an updated changelog based on the PR commits.
4. This will immediately update all other local packages relying on the changed package & publish the new versions to npm.

## Getting Started
1. Simply run `npm run bootstrap` on the root folder, this will install all npm packages & link local dependencies.
2. To create a new pacakge you can run `npm run new:package`.
3. To create a new commit with the commit cli run `npm run commit`. this will prompt a wizard that will help you describe your commits better.
4. to execute a command on all the **changed** packages simply run `npm run exec {your command here}`.
5. to execute a command on all packages, run `lerna exec {your command here}`.

## Folder structure
All our packages are under the packages folder.

We divide our folders by distribution platforms:
- packages
  - ui
  - crossPlatform
  - server
 
## Commit linting & Conventional Commits
We are using a structured commit messages, this is what that allows us
to automatically generate changelogs & decide what kind of semver update we need.
To make sure we are using the convention, we have `lint` rules on our commit messages; invalid commit message will not allow you to commit. (enforced by [commitlint](https://github.com/marionebl/commitlint))
The automatic resolving of versions & changelog are powered by [Conventional Commits](https://www.conventionalcommits.org) library.

### Writing the right commit message
You can start learning how to write a useful commit message by using the `npm run commit` command.

This is how it looks like:

![npm-run-commit](https://user-images.githubusercontent.com/7824284/52049233-f25ade00-2555-11e9-9671-ed3a6f327385.gif)

We are using the angular convention for commit messages, you can learn more about it [here](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines)


## How to add an existing project into the repo.
1. create a new branch.
2. make sure you have the project you want to move cloned in your computer.
3. 
    - execute `lerna import {PATH TO CLONED LOCATION} --dest=packages/{PACKAGE PLATFORM}`
    - in case it fails try adding `--flatten` to flatten the imported project history which usually solves the problem.
4. make sure to standardize your project npm scripts:
   - it should have the following commands in the scripts section of the `package.json`:
        - "test:ci": "npx jest --ci --reporters=default --reporters=jest-junit --runInBand --coverage"
        - "lint:ci": "npx eslint . --format junit -o $LINT_JUNIT_OUTPUT"
    - **note** if you need to build your package before any of the phases, use npm [`pre` or `post` hooks](https://docs.npmjs.com/misc/scripts) (`prepubilsh`, `pretest`, etc...)
5. delete .circleci of the imported package
6. push the changes and create a PR.
7. `archive` the original package repo @ github, to prevent anyone from continuing to use it by mistake

### Developing multiple packages at once
Generally it might be a bad practice to work on more than one package at a time,
because we always prefer to break our tasks into smaller subtasks and multiple PRs.
However in some cases we do have a good reason to work on multiple packages at once.

If you have started your project with `npm run bootstrap` then you are all set!
Otherwise you can run `lerna link` it will automatically link local packages.
Meaning changes in one package would immediately effect other local packages, relying on the package we've changed.
A PR that contains changes in several packages will make the CI run against all the changed packages.


## Introducing breaking changes
If you create a breaking change, make sure to add `BREAKING CHANGE` text to your commit meesage so lerna will properly version it.

**Important:** local npm packages which consume other local package will be updated **reagrdless** of `semver` definitions. 

Introducing breaking changes in a dependency that is being consumed by other local npm packages might break them.
You'll have to migrate all local npm packages in order to let the breaking change out.
[See](https://github.com/lerna/lerna/issues/1907#issuecomment-459476781)
