let  fs = require('fs')

let util = require('util')
let path = require('path')
let read = util.promisify(fs.readFile)
util.inherits()
read(path.join(__dirname,'./a.txt'),'utf8').then(function(data){
  console.log(__dirname)
  read(path.join(__dirname,data),'utf8').then(function(data1){
    console.log(data1)
  })
}).catch(err=>{
  console.log(err)
})

//链式 then接受promise对象 里面是数据 只要第一个是promise即可链式,后面的可以不是promise对象
read(path.join(__dirname,'./a.txt'),'utf8').then(function(data){
  return read(path.join(__dirname,data),'utf8')
}).then(function(data){
  return data+"帅"
}).then(function(data){
  console.log(data)
}).catch(err=>{
  console.log(err)
})

//async await 后面只能是promise  forEach 是同步炒作 只能用for循环来await
async function readResult(){
  try{
    var content1 = await read(path.join(__dirname,'./a.txt'),'utf8')
    var content = await read(path.join(__dirname,content1),'utf8')
    console.log(content)
  }catch(err){console.log(errr)}
 
} 
readResult()
