//require 手写
/* let fs  = require('fs')

function req(str){
  let content = fs.readFileSync(str,'utf8')
  let fn = new Function('exports','module','require',content+'\n return module.exports')
  let module  = {
    exports:{}
  }
  return fn(module.exports,module,req)
}

let str = req('./a.js')
console.log(str)

 */
//手写define
/* let factorys = {}
function define(modules,depences,callback){
   
  let results =  modules.map(item=>{
     factorys[item]=callback
     callback.depences = depences
     let module = callback.apply(null)
     return module
   }) 
   return results
}

function require(modules,callback){
 let results = modules.map(item=>{
    let fn =factorys[item]
   
    let a ={}
   // console.log(fn.depences)
     require(fn.depences,function(){
     
       a = fn.apply(null,arguments)
       //console.log(a)
     })
  
   
   return a
  })
  
  callback.apply(null,results)
}
define(['name'],[],function(){
  return 'this is name'
}) 
define(['age'],['name'],function(name){
  return name+'age'
})

require(['age'],function(age){
  console.log('name',age)
}) */