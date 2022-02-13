const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: process.env.APP_ENV,
    watchOptions: {
        ignored: '**/node_modules',
    },
    entry: {
        'dist/runtime': path.resolve('./src/runtime'),
        'test/html/js/app': path.resolve('./test/app')
    },
    output: {
        path: path.resolve('.'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            APP_ENV: JSON.stringify(process.env.APP_ENV),
        }),
    ],
    devtool: process.env.APP_ENV === 'production' ? false : 'eval',
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
}
