let util = require('util')
let fs = require('fs')
let arr = []
let path = require('path')
console.log(util.isArray(arr))

function A (){
  this.sleeping = '睡觉'
}

A.prototype.eating = '吃吃饭'

function B(){
}
/* Object.setPrototypeOf(B.prototype,A.prototype) */
/* function setP(b,a){
  b.__proto__ = a
} */
function create(obj){
  function Fn(){}
  Fn.prototype = obj
  return new Fn()
}
B.prototype = create(A.prototype)
/* setP(B.prototype,A.prototype) */
let b = new B()
console.log(b.eating)
//总结 __proto 和new ()是反的过程,都在原型上做文章
/* console.log( b instanceof B)
console.log( b instanceof A) */ //instance判断不了继承 instance原理 判断b是否在B的原型链上面,很明显继承原型链,都在


//constructor 指向对象(可以是原型也可以是实例对象)的构造函数

//A->protorype->A.prototype  A.prototype.constructor->A   a.constructor->A
console.log( b.constructor== B)
console.log( b.constructor == A) //最高的构造函数
console.log(Object.prototype.toString.call(b))

/* //本来这个样子 fs.readFile('a.js','utf8',function(err,data))
let read = util.promisify(fs.readFile) //把回调函数中有err,data两种情况的函数promise化

read(path.resolve(__dirname,'./a.js'),'utf8').then(function(data){
  console.log(data)
},function(err){console.log(err)})//这里就不用写回调

console.log(1) //异步的话这个1是在data前面出现的 */

let data = readFileSync(path.resolve(__dirname,'./a.js'),'utf8') //同步,假如报错,那么下面的代码也不知行
console.log(1) //异步的话这个1是在data前面出现的