let fs = require('fs')
let path = require('path')
//stat

fs.stat(path.join(__dirname,'a.txt'),function(err,stats){
  if(err)return console.log(err)
  console.log(stats)
  console.log(stats.isFile())
})

//穿件目录

fs.mkdir('a/b',function(err){})

//自己写函数实现多级创建

function makeP(url){
  let arr = url.split('/')//[a,b,c]
  var index = 0
  function make(url){
    if(index > arr.length ) return 
    fs.stat(url,function(err1,stats){
      console.log(url)
      if(err1){
        
        return  fs.mkdir(url,function(err){
            if(err)return console.log(err)
               index = index+1
               make(arr.slice(0,index+1).join('/'))
            })
        
      }
      if(stats.isDirectory()){
        index = index + 1
        make(arr.slice(0,index+1).join('/'))
      }
      
    })
    
    
  }
  make(arr[index])
}

makeP('a/b/c/d')