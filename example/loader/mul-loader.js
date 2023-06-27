module.exports = function (src) {
    let result = 1
    if (src) {
        const nums = src.split('')
        nums.forEach((item) => {
            result *= (+item)
        })
    }
    return result + ''
}