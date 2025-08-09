const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add configuration to help with bundling
config.resolver.assetExts.push('cjs');

module.exports = config;