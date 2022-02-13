const path = require('path');

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
    devtool: process.env.APP_ENV === 'production' ? false : 'eval',
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
}
