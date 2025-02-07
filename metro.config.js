// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.resolver.unstable_enablePackageExports = true;
module.exports = config;

// if you use bare React Native:
// const config = {
//   resolver: {
//     unstable_enablePackageExports: true,
//   },
// };
// module.exports = mergeConfig(getDefaultConfig(__dirname), config);
