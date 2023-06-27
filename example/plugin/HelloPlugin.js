const copy = require('./copy.js')

class HelloPlugin {
    constructor(options) {
        this.from = options.from
        this.to = options.to
    }
    apply(compiler) {
        // webpack生命周期钩子 afterEmit(打包生成资源后调用) | done(编译完成时调用) | ...
        compiler.hooks.afterEmit.tap('CopyPlugin', () => {
            copy(this.from, this.to)
        })
    }
}

module.exports = HelloPlugin