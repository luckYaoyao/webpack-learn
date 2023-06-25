export const name = 'hello1'
console.log(name)

console.log('aaa')
// console.log('ccc')

if (module.hot) {
    module.hot.accept()
}