const fs = require('fs')
const path = require('path')
const stat = fs.stat

const copyFun = function(src, dest) {
    fs.readdir(src, function (err, paths) {
        if (err) {
            throw err
        }
        paths.forEach(function (path) {
            const from = src + '/' + path
            const to = dest + '/' + path
            let readStream, writeStream
            stat(from, function (err, s) {
                if (err) {
                    throw err
                }
                if(s.isFile()) {
                    readStream = fs.createReadStream(from)
                    writeStream = fs.createWriteStream(to)
                    readStream.pipe(writeStream)
                }
                else if (s.isDirectory()) {
                    copy(from, to)
                }
            })
        })
    })
}

const copy = function(src, dest) {
    fs.exists(dest, function(exist) {
        if (exist) {
            copyFun(src, dest)
        }
        else {
            fs.mkdir(dest, function() {
                copyFun(src, dest)
            })
        }
    })
}


module.exports = copy