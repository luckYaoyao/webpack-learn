const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    }
})