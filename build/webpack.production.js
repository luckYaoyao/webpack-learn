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
        minimizer: [new CssMinimizerPlugin()],
        // 通过规则实现模块的自动提取
        splitChunks: {
            // 表示从什么类型的chunks里面提取代码, initial(只从入口chunks里提取代码) | async(默认值，只从动态加载的chunks提取代码) | all(从异步chunks和入口chunks提取代码)
            chunks: 'async',
            // 提取出来chunk的最小体积, 默认值20K
            minSize: 20000,
            // 提取出来chunk的最大体积, 默认值0，表示不限制最大体积
            maxSize: 0,
            minRemainingSize: 0,
            // 表示拆分前至少被多少个chunks引用的模块才会被提取, 默认值1
            minChunks: 1,
            // 按需（异步）加载时的最大并行请求数，默认值30, webpack4版本默认值5
            maxAsyncRequests: 30,
            // 入口点的最大并行请求数，默认值30, webpack4版本默认值5
            maxInitialRequests: 30,
            enforceSizeThreshold: 50000,
            // 缓存组
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    reuseExistingChunk: true
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    }
})

console.log(config)

module.exports = config