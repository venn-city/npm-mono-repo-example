const checkNodeVersion = version => {
  const versionRegex = new RegExp(`^${version}\\..*`);
  const actualNodeVersion = process.versions.node;
  const versionCorrect = actualNodeVersion.match(versionRegex);
  if (!versionCorrect) {
    throw Error(
      `Running on wrong Nodejs version (${actualNodeVersion}). Please change the node runtime to version ${version}`
    );
  }
};
checkNodeVersion(8);
