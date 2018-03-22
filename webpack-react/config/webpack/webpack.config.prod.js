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

// local css modules
// loaders.push({
//     test: /[\/\\]src[\/\\].*\.css/,
//     exclude: /(node_modules|bower_components|public)/,
//     use: [
//         MiniCssExtractPlugin.loader,
//         'style-loader',
//         'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
//     ],
// });

// local scss modules
// loaders.push({
//     test: /[\/\\]src[\/\\].*\.scss/,
//       // test: /\.scss$/,
//     exclude: /(node_modules|dist|build)/,
//     use: [
//         {
//             loader: 'css-loader',
//             options: {
//                 sourceMap: true,
//                 minimize: true,
//             },
//         },
//         {
//             loader: 'postcss-loader',
//             options: {
//                 plugins: () => [
//                     autoprefixer({
//                         browsers: [
//                             '>1%',
//                             'last 4 versions',
//                             'Firefox ESR',
//                             'not ie < 9', // React doesn't support IE8 anyway
//                         ],
//                     flexbox: 'no-2009',
//                 })],
//                 sourceMap: true,
//             },
//         },
//         {
//             loader: 'sass-loader',
//             options: {
//                 sourceMap: true,
//             },
//         },
//     ],
// });

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
            loader: 'sass-loader',
            options: {
                sourceMap: true,
                precision: 8,
                data: '$ENV: ' + 'PRODUCTION' + ';'
            },
        },
        {
            loader: 'sass-resources-loader',
            options: {

                // array of paths to sass resources (previously @import in each file)
                resources: [
                    path.resolve(dir, 'src/sass/variables.scss'),
                    path.resolve(dir, 'src/sass/mixins.scss'),
                ]
            }
        },
    ],
});

// global css files
// loaders.push({
//     test: /[\/\\](node_modules|global)[\/\\].*\.css$/,
//     use: [
//         MiniCssExtractPlugin.loader,
//         'css-loader',
//     ],
// });

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
            {
                ignore: [
                    '.DS_Store',
                    '.gitkeep'
                ]
            }
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
