// import { name } from './b'
// import './md-close@2x.png'
// import './style.css'
import('./b.js')
// console.log(name)
let add = (a, b) => a + b
console.log(add(3, 5))
import img1 from './md-close@2x.png'
import img2 from './comment_opts@2x.png'

console.log(IS_OLD, MY_ENV, NAME)

window.onload = function () {
    console.log('img1', img1)
    console.log('img2', img2)
    const imgDom1 = `<img src=${img1}>`
    const imgDom2 = `<img src=${img2}>`
    document.querySelector('#main1').innerHTML = imgDom1
    document.querySelector('#main2').innerHTML = imgDom2
}
console.log('333445')

import './b.css'
import './c.scss'