const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 样式抽离
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 性能监控
// 打包体积分析工具
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// 打包速度分析工具
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin')
const ENV = process.env.NODE_ENV

const smp = new SpeedMeasureWebpackPlugin()

const config = {
    // 资源入口相对的路径（绝对路径，默认为项目根目录）, context为src, entry为./packages/a.js, 路径为./src/package/a.js
    // context: path.resolve(__dirname, '../src'),
    mode: 'none',
    entry: './packages/a.js',
    output: {
        path: path.resolve(__dirname, '../dist'),
        // [name].js [hash].js [id].js
        filename: 'bundle.js',
        // 默认值 auto
        // publicPath: 'auto',
        //  非入口文件chunk名称, 常用语异步模块
        chunkFilename: '[id]-[contenthash:8].js'
    },
    resolve: {
        extensions: ['.css', '.js', '.jpg', '.png']
    },
    module: {
        rules: [
            // {
            //     test: /\.jpg|png$/,
            //     // use: 'file-loader'
            //     use: {
            //         loader: 'url-loader',
            //         options: {
            //             limit: 1024 * 8,
            //             name: '[name].[ext]',
            //         }
            //     },
            // },
            {
                test: /\.jpg|png$/,
                type: 'asset/resource'
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        cacheDirectory: true
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, '../packages/img/'),
                    to: path.resolve(__dirname, '../dist/image/')
                }
            ]
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../packages/template/index.html'),
            title: 'Hello',
            filename: 'index.html',
            // 模板是否压缩
            minify: false,
            // 是否在HTML文件中展示详细错误信息
            showErrors: true
        }),
        // 环境变量
        new webpack.DefinePlugin({
            IS_OLD: true,
            MY_ENV: JSON.stringify('dev'),
            NAME: "'Jack'"
        }),
        new MiniCssExtractPlugin({
            filename: '[name]-[contenthash:8].css',
            chunkFilename: '[id].css'
        }),
        new BundleAnalyzerPlugin()
    ],
    devServer: {
        host: 'localhost',
        port: 8089,
        open: false,
        hot: true,
        // 静态资源是否开启Gzip压缩
        compress: true,
        historyApiFallback: true
    },
    devtool: 'source-map',
    // 性能提示
    performance: {
        // 入口资源最大体积
        maxEntrypointSize: 512000,
        // 打包资源最大体积
        maxAssetSize: 1000,
        // 如何提示信息：'warning' | 'error' | false
        hints: 'warning',
        assetFilter: function(assetFileName) {
            return !/\.map$/.test(assetFileName)
        }
    }
}

module.exports = smp.wrap(config)