const  { SyncHook } = require('tapable')

const hook1 = new SyncHook(['str'])

hook1.tap('tap1', function (arg) {
    console.log(arg + 1)
})

hook1.tap('tap2', function (arg) {
    console.log(arg + 2)
})

hook1.call('我是调用参数')
// hook1.call('我是调用参数1')