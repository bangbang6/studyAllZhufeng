let fs  =require('fs')
let path = require('path')
function pipe(){
  let rs = fs.createReadStream(path.join(__dirname,'1.txt'),{highWaterMark:4})
  let ws = fs.createWriteStream(path.join(__dirname,'2.txt'),{highWaterMark:1})
  rs.on('data',function(chunk){ // 一定会读完整个文件
    if(!ws.write(chunk)){
           rs.pause()
    }
    ws.on('drain',function(){
      rs.resume()
    })
    rs.on('end',function(){
      ws.end()
    })
  })
  //以上代码是pipe()的源码实现
}
pipe()