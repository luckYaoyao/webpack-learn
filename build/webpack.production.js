const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
// 样式抽离
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 压缩CSS
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const config = merge(common, {
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]-[contenthash:8].css',
            chunkFilename: '[id].css'
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [new CssMinimizerPlugin()]
    }
})

console.log(config)

module.exports = config