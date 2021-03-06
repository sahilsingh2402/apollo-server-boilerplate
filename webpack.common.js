const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

module.exports = (env) => {
  const plugins = [new CleanWebpackPlugin()];
  if (env && env.a) {
    plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        defaultSizes: 'gzip',
        generateStatsFile: true,
        openAnalyzer: true,
        reportFilename: path.resolve(`../build-analysis/index.html`),
        statsFilename: path.resolve(`../build-analysis/results.json`),
      })
    );
  }

  return {
    output: {
      filename: 'server.js',
      path: path.resolve(__dirname, 'dist'),
    },
    target: 'node',
    plugins,
    module: {
      rules: [
        {
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          loader: 'graphql-tag/loader',
        },
      ],
    },
  };
};
