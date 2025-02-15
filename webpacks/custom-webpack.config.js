const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  plugins: [
    // Gzip Compression
    new CompressionPlugin({
      filename: '[path][base].gz',
      algorithm: 'gzip',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240, // Only assets bigger than 10KB
      minRatio: 0.8,
    }),
    // Brotli Compression
    new CompressionPlugin({
      filename: '[path][base].br',
      algorithm: 'brotliCompress',
      compressionOptions: { level: 11 },
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
};
