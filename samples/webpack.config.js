const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        'samples/html/js/app': path.resolve('./samples/app')
    },
    output: {
        path: path.resolve('.'),
        filename: '[name].js',
    },
    devtool: 'eval-source-map',
    resolve: {
        extensions: ['.js'],
    },
};
