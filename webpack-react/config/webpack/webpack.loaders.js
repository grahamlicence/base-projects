module.exports = [
    {
        test: /\.js$/,

        // if a module uses es6, include using:
        // exclude: /node_modules\/(?!(MY-MODULE|ANOTHER-ONE)\/).*/,
        exclude: /(node_modules)/,
        use: {
            loader: 'babel-loader',
        },
    },
    {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        exclude: /(node_modules)/,
        loader: 'file-loader',
    },
    {
        test: /\.(woff|woff2)$/,
        exclude: /(node_modules)/,
        loader: 'url-loader?prefix=font/&limit=5000',
    },
    {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        exclude: /(node_modules)/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream',
    },
    {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        exclude: /(node_modules)/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
    },
    {
        test: /\.gif/,
        exclude: /(node_modules)/,
        loader: 'url-loader?limit=30000&mimetype=image/gif',
    },
    {
        test: /\.jpg/,
        exclude: /(node_modules)/,
        loader: 'url-loader?limit=30000&mimetype=image/jpg',
    },
    {
        test: /\.png/,
        exclude: /(node_modules)/,
        loader: 'url-loader?limit=30000&mimetype=image/png',
    }
];
