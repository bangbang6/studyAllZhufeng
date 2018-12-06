let fs = require('fs')

/* function isString(s){
    return Object.prototype.toString.bind(s)
}
console.log(isString('dd')()) */

//函数工场 专门产生函数

function isType(type){

    return function(s){
        Object.prototype.toString.call(s) == `[Object ${type}]`
    } 
}
//相当于生成器
function myAfter(timers,fn){
  let count = 1
  // 相当于迭代器
  return function(){
      if(count++==timers){
          fn()
      }
  }
}
function eat(){
    console.log(1)

}
newEat = myAfter(3,eat)
newEat()
newEat()
newEat()


// 回调函数的缺点 
//1.无法try catch  
//2. 无法return值
//原因 当回调函数执行的时候 调用函数read那句话已经执行完啦 所以返回值没有 而且trycatch也没有 因为执行读文件的时候还没执行回调没返回值
function read(){
    fs.readFile('./1.txt',function(err,data){
        return data
    })
}
console.log(read())

//3.回调地狱 
//解决办法 事件发布订阅 即要执行的时候才调用emit
