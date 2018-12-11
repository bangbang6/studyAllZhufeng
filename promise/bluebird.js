//bluebird 是世界上最快的promise库 可以将异步回调方法变成返回promise的promise类型方法
let Promise = require('bluebird')
let fs = require('fs')
let readFileSync =Promise.promisify(fs.readFile)//类似util的promisify
readFileSync('1.txt','utf8').then(function(data){
    console.log(data)
})
console.log(1)

//手写一个promisofy
/* function promisify(fn){
    return  function(...args){
        return new Promise(function(reslove,reject){
            fn.apply(null,[...args,function(err,data){
                if(err) reject(err)
                reslove(data)
            }])
        })
      
    }
} */

let aarr = []

aarr[4] = 1
console.log(aarr.length)


console.log(Promise.promisifyAll(fs))   //promisifyAll  遍历对象山所有的方法 然后复制出来一份为每个方法添加一个新方法Async成promise形式

// 手写promisefyAll
function promisefyAll(obj){
 for(let key in obj){
  if(obj.hasOwnProperty(key)  && typeof key == 'function'){ //hasOwnProperty检查是否有该属性
      obj[key + 'Async'] = promisefy(key)
  }
}



*/