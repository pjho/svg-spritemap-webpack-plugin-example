const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');


module.exports = {
    name: 'test',
    mode: 'production',
    devtool: 'source-map',

    'entry': {
        'site': path.resolve(__dirname, 'index.js'),
        'style': path.resolve(__dirname, 'index.scss'),
    },

    'output': {
        'path': path.resolve(__dirname, 'dist'),
        'filename': '[name].js'
    },

    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader' },
                    { loader: 'sass-loader' },
                ],
            }
        ],
    },
    plugins: [
        new SVGSpritemapPlugin(
            'icons/**/*.svg',
            {
                output: {
                    filename: 'icon-sprite.svg',
                    svg: { sizes: false },
                    svg4everybody: true,
                    svgo: true,
                },
                sprite: {
                    prefix: false,
                    generate: {
                        title: false,
                        symbol: true,
                    },
                },
                styles: {
                    filename: '~icons.scss',
                    format: 'data',
                    variables: {
                        sprites: 'icons',
                        mixin: 'icon',
                    },
                },
            }
        ),
        new MiniCssExtractPlugin(),
    ],
};
