//async 就是用到啦co这个库
async function read(){
    
    let a = await readFile('1.txt') //必须是promise
    console.log(a)
    let b = await readFile('2.txt')
    console.log(b)
    let c = await readFile('3.txt')
    console.log(c)
    return 'ok'
}
//器内部实现原理
/* function read(){
    co(function *(){
        let a = yield readFile('1.txt')
        console.log(a)
        let b = yield readFile('2.txt')
        console.log(b)
        let c = yield readFile('3.txt')
        console.log(c)
        return 'ok'
    })
} */

let fs = require('fs')
function readFile(name){
    return new Promise(function(reslove,reject){
        fs.readFile(name,'utf8',function(err,data){
            err?reject(err):reslove(data)
        })
    })
   
}
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



read()
