module.exports = function override(config, env) {
  config.optimization.runtimeChunk = 'single';
  config.optimization.providedExports = true;
  config.optimization.splitChunks = {
    chunks: 'all',
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name(module) {
          const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
          return `npm.${packageName.replace('@', '')}`;
        },
      },
    },
  };
  return config;
};
