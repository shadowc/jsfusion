const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: process.env.APP_ENV,
    watchOptions: {
        ignored: '**/node_modules',
    },
    entry: {
        [process.env.APP_ENV === 'production' ? 'dist/runtime.min' : 'dist/runtime']: {
            import: path.resolve('./src/runtime'),
            library: {
                type: 'commonjs-static',
            }
        },
        [process.env.APP_ENV === 'production' ? 'dist/runtime.umd' : 'dist/runtime.umd.dev']: {
            import: path.resolve('./src/runtime'),
            library: {
                name: 'JsFusion',
                type: 'umd',
            }
        },
        'samples/html/js/app': path.resolve('./samples/app')
    },
    output: {
        path: path.resolve('.'),
        filename: '[name].js',
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
    devtool: process.env.APP_ENV === 'production' ? false : 'eval-source-map',
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
}
