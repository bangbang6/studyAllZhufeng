

function *read(x){
    console.log(x)
    let a = yield readFile('1.txt')
    console.log(a)
    let b = yield readFile('2.txt')
    console.log(b)
    let c = yield readFile('3.txt')
    console.log(c)
    return 'ok'
}
let fs = require('fs')
function readFile(name){
    return new Promise(function(reslove,reject){
        fs.readFile(name,'utf8',function(err,data){
            err?reject(err):reslove(data)
        })
    })
   
}
/* let it = read()
let r1 = it.next()
let r2 = it.next(1)
let r3 = it.next(2)
let r4 = it.next(3) //3是输入等号号前面的东西 value是输出 return 或者yied后的东西
console.log(r3)
console.log(r4) */

//co库 自动执行generator

//手写一个简单的co

function co(gen){
    let it = gen()  
  return new Promise(function(resolve,reject){

     (function next(lastValue){
      let r = it.next(lastValue)
      if(!r.done){
        r.value.then(function(data){
            next(data)
           },reject)
        }else{
            resolve(r.value)
        }
      }
    )()
    
  })
}

co(read.bind(null,1)).then(data=>{
    console.log(data)
})
