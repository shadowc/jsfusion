const path = require('path');

module.exports = {
    mode: process.env.APP_ENV,
    watchOptions: {
        ignored: '**/node_modules',
    },
    entry: {
        'runtime': path.resolve('./assets/runtime'),
        'app': path.resolve('./assets/test-components/app')
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
