let eventEmitter = require('./eventE.js')



let util = require('util')
function Girl(){
  //需要把私有属性也继承过来才行
}
util.inherits(Girl,eventEmitter)
//class 的继承 用extends 必须constructor super继承父类的私有属性

let girl = new Girl()

girl.once('失恋',function(){
  console.log('哭')
})
let fn = function(){
  console.log('吃')
}
girl.on('失恋',fn)
girl.removeListener('失恋',fn)//fn不能直接写回调函数,因为fn是个函数,你写回调的话的意思是异步调用回调函数
girl.emit('失恋')
girl.emit('失恋')

//手写 EVentEmitter
