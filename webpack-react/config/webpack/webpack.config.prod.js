const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const loaders = require('./webpack.loaders');

const dir = fs.realpathSync(process.cwd());

// local css modules
loaders.push({
    test: /[\/\\]src[\/\\].*\.css/,
    exclude: /(node_modules|bower_components|public)/,
    loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]')
});

// local scss modules
loaders.push({
        test: /[\/\\]src[\/\\].*\.scss/,
          // test: /\.scss$/,
        exclude: /(node_modules|dist)/,
        use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: [
                  {
                      loader: 'css-loader',
                      options: {
                          sourceMap: true,
                          minimize: true,
                      },
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
              ],
          }),
    });

// global css files
loaders.push({
    test: /[\/\\](node_modules|global)[\/\\].*\.css$/,
    loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
});

module.exports = {
    context: path.resolve(dir, 'src'),

    entry: [
        './app/index.js',
    ],

    module: {
        rules: loaders
    },

    resolve: {
        alias: {
            app: path.resolve(dir, 'src/app'),
            sass: path.resolve(dir, 'src/sass'),
            images: path.resolve(dir, 'src/images'),
        },
    },

    output: {
        path: path.resolve(dir, 'dist'),
        filename: '[chunkhash].js'
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),

        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),

        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true,
                drop_console: true,
                drop_debugger: true
            }
        }),

        new CopyWebpackPlugin([
            { from: './images', to: './images' }
        ]),

        new ExtractTextPlugin('[contenthash].css', {
            allChunks: true
        }),

        new HtmlWebpackPlugin({
            template: './template.html',
            title: 'Lorem ipsum'
        }),
    ],
};
