const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  entry: './server.ts',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'server.bundle.mjs',
    library: {
      type: 'module', // Output the bundle as an ES module
    },
  },
  experiments: {
    outputModule: true, // Enable ES module output
  },
  resolve: {
    extensions: ['.ts', '.mjs'],
    alias: {
      src: path.resolve(__dirname, '../src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  mode: "development",
};
