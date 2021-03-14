const path = require('path');

const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

module.exports = (env) => ({
    name: 'test',
    mode: 'none',
    entry: {
        'app': path.resolve(__dirname, '..', 'src/js/site.js'),
    },
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, '../dist'),
        filename: 'build/js/[name].[contenthash].js',
    },
    module: {
        rules: [],
    },
    plugins: [
        new WebpackManifestPlugin({
            removeKeyHash: /([a-f0-9]{16,32}\.?)/gi,
            writeToFileEmit: true,
        }),
        new SVGSpritemapPlugin(
          path.resolve(__dirname, '..', 'src/icons/**/*.svg'),
          {
            output: {
              filename: 'build/foo.[contenthash].svg',
              chunk: {
                'name': 'bar'
              }
            }
          }
        ),
    ],
});
