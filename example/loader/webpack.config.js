const path = require('path')

module.exports = {
    entry: './a.js',
    output: {
        path: path.resolve(__dirname, ''),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.hi$/,
                // use: ['./math-loader.js']
                use: [
                    {
                        loader: './add-loader.js',
                        options: {
                            repeat: true
                        }
                    },
                    './mul-loader.js'
                ]
            }
        ]
    },
    mode: 'none'
}