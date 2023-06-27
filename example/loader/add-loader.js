module.exports = function(src) {
    let result = ''
    if (src) {
        result = +src + 100
    }
    const options = this.query
    if (options.repeat) {
        result *= 2
    }
    return `module.exports = '${result}'`
}