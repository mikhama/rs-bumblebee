const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  target: 'node',
  mode: 'production',
  entry: './src/index.js',
  module: {
    rules: [
      { enforce: 'pre', test: /\.js$/, loader: 'eslint-loader' },
    ],
  },
  output: {
    filename: 'rs-bumblebee.js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    minimizer: [
      /*
        NOTE: TerserPlugin plugin with this configuration
        is used in order to handle this issue of discord.js:
        https://github.com/discordjs/discord.js/issues/1836#issuecomment-510512818
      */
      new TerserPlugin({
        terserOptions: {
          keep_classnames: true,
        },
      }),
    ],
  },
};
