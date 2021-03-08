const path = require('path')
module.exports = {
    entry: './promise/promise.js',
    mode: 'production',
    devtool: 'inline-source-map',
    devServer: {
        https: true,
        contentBase: './dist'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'promise.js',
        clean: true,
        library: 'MyPromise',
        libraryTarget: 'umd'
    }
}
