//import { Promise } from './C:/Users/www/AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/bluebird';

/* let q = require('q') */
//手写一个Q
let Q = {
    defer(){
        let success ,rejected
        return {
            reject:function(err){
                rejected(err)
            },
            resolve:function(value){
                success(value)
            },
            promise:{
                then(onfillfiled,rejected){
                    success = onfillfiled
                    rejected = rejected
                }
            }
        }
    }
}
let fs  = require('fs')
function readFile(filename){
    let defer = Q.defer() 
  fs.readFile('1.txt','utf8',function(err,data){
      if(err){
          defer.reject(err)
      }
      if(data){
          defer.resolve(data)
      }
    
  })
  return defer.promise //返回promise对象
}
readFile('1.txt').then(function(value){
    console.log(value)
})


let r = Q.spread([Promise.resolve(1),Promise.resolve(2)],function(a,b){
return a+b
})
r.then(data=>{
    console.log(data)
})
