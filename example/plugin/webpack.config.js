const path = require('path')
const HelloPlugin = require('./HelloPlugin')

module.exports = {
    entry: './a.js',
    output: {
        path: path.resolve(__dirname, ''),
        filename: 'bundle.js'
    },
    plugins: [
        new HelloPlugin({
            from: path.resolve(__dirname, 'pic'),
            to: path.resolve(__dirname, 'img'),
        })
    ],
    mode: 'none'
}