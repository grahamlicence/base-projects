const path = require('path');
const fs = require('fs');
const loaders = require('./webpack.loaders');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const dir = fs.realpathSync(process.cwd());

const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || '3000';

// local scss modules
loaders.push({
    test: /\.scss$/,
    use: [
        'style-loader',
        'css-loader',
        'postcss-loader',
        'sass-loader',
        {
            loader: 'sass-resources-loader',
            options: {

                // array of paths to sass resources (previously @import in each file)
                resources: [
                    path.resolve(dir, 'src/sass/variables.scss'),
                    path.resolve(dir, 'src/sass/mixins.scss')
                ]
            }
        }
    ]
});

module.exports = {
    context: path.resolve(dir, 'src'),

    entry: [
        `webpack-dev-server/client?http://${HOST}:${PORT}`,
        'webpack/hot/only-dev-server',
        // path.resolve(__dirname, 'src/js/index.js'),
        './app/index.js',
    ],

    module: {
        rules: loaders
    },

    output: {
        filename: 'app.js',
        path: path.resolve(dir, 'dist'),
    },

    devServer: {
        filename: 'bundle.js',
        contentBase: "./src",

        // do not print bundle build stats
        noInfo: true,

        // enable HMR
        hot: true,

        // embed the webpack-dev-server runtime into the bundle
        inline: true,

        // serve index.html in place of 404 responses to allow HTML5 history
        historyApiFallback: true,
        port: PORT,
        host: HOST,

        stats: { colors: true, errorDetails: true, }
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            template: './template.html',
            title: 'Lorem ipsum'
        }),
    ],
}
