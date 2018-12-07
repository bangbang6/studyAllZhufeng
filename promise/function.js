let fs = require('fs')

/* function isString(s){
    return Object.prototype.toString.bind(s)
}
console.log(isString('dd')()) */

//函数工场 专门产生函数1. 一秒钟一个函数 提取函数的共同点 2.减少全局变量  还可以添加无数个参数 类似装饰器 方便修改参数 
//又和迭代器/生成器差不多 -->当任务完成特定数量的时候执行 -->对应2的好处

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
/* function read(){
    fs.readFile('./1.txt',function(err,data){
        return data
    })
}
console.log(read()) */

//3.回调地狱 
//解决办法 事件发布订阅 即要执行的时候才调用emit
//1.event

/* let eventEmitter = require('events')
let eve = new eventEmitter()
let html = {}
eve.on('Ready',function(template,data){
    html[template] = data
    if(Object.keys(html).length == 2){
        console.log(html)
    }
})
fs.readFile('./1.txt',function(err,template){
  eve.emit('Ready','template',template)
})
fs.readFile('./1.txt',function(err,data){
    eve.emit('Ready','data',data)
  }) */
//2.哨兵变量 i 可修改 ready是工厂函数 他只是起到啦给哨兵变量timer的作用
//用done函数来执行
/* function ready(timers,cb){
    let html = {}
    return function(key,value){
        html[key] = value
        if(timers == Object.keys(html).length ){cb()}
    }
}
done = ready(2,function(){console.log('end')})
fs.readFile('./1.txt',function(err,template){
    done('template',template)
  })
  fs.readFile('./1.txt',function(err,data){
      done('Ready','data',data)
}) */

//由2所以发布订阅模式out产生啦生成器迭代器
//yield左边是输入
function *go(){
    let b = yield 'a'
    let c = yield b
    return c  
}
let it = go()
let r1 = it.next()
console.log(r1)
let r2 = it.next('b值')
console.log(r2)
let r3 = it.next('c值')
console.log(r3)