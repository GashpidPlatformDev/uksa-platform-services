const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      // Otras configuraciones de Webpack
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.svg'],
    alias: {
      assets: path.resolve(__dirname, 'src/assets'),
    },
  },
};
