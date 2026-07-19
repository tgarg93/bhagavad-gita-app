const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// NOTE: an old workaround here pushed 'cjs' onto assetExts — that makes Metro
// bundle .cjs files as static assets (not code), which broke @supabase/supabase-js
// (its react-native entry is dist/index.cjs). Metro already treats .cjs as source.

module.exports = config;