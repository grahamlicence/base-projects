const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CSSNano = require('cssnano');
const packageJSON = require('../../package.json');

const loaders = require('./webpack.loaders');

const dir = fs.realpathSync(process.cwd());

// sass
loaders.push({
    test: /\.(scss)$/,
    use: [
        MiniCssExtractPlugin.loader,
        {
            loader: 'css-loader',
            options: {
                url: false,
                minimize: true,
                sourceMap: true,
            }
        },
        {
            loader: 'postcss-loader',
            options: {
                plugins: () => [
                    autoprefixer({
                        browsers: [
                            '>1%',
                            'last 4 versions',
                            'Firefox ESR',
                            'not ie < 9', // React doesn't support IE8 anyway
                        ],
                    flexbox: 'no-2009',
                })],
                sourceMap: true,
            },
        },
        {
            loader: 'sass-loader',
            options: {
                sourceMap: true,
            },
        },
        {
            loader: 'sass-resources-loader',
            options: {
                resources: [
                    path.resolve(dir, 'src/sass/variables.scss'),
                    path.resolve(dir, 'src/sass/mixins.scss'),
                ]
            },
        },
    ],
});

module.exports = {
    context: path.resolve(dir, 'src'),

    entry: './app/index.js',

    mode: 'production',

    module: {
        rules: loaders,
    },

    resolve: {
        alias: {
            app: path.resolve(dir, 'src/app'),
            sass: path.resolve(dir, 'src/sass'),
            images: path.resolve(dir, 'src/images'),
        },
    },

    output: {
        path: path.resolve(dir, 'build'),
        filename: 'app.js',
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),

        new CopyWebpackPlugin([
            { from: './images', to: './images' },
        ]),

        new MiniCssExtractPlugin({
            filename: 'main.css',
        }),
        
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.main\.css$/g,
            cssProcessor: CSSNano,
            cssProcessorOptions: { discardComments: { removeAll: true } },
            canPrint: true,
        }),

        new webpack.BannerPlugin({
            banner: `${packageJSON.name} v${packageJSON.version}`,
        }),

        new HtmlWebpackPlugin({
            template: './template.html',
            title: 'Lorem ipsum'
        }),
    ],
};
