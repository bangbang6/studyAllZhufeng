let express = require('express')
let fs = require('fs')
let app = express()
app.listen(3000)
/* //手写express.static
function static(p){
  return function(req,res,next){
   
   
    var newP = require('path').join(p,req.path)
    console.log(newP)
    fs.stat(newP,function(err,status){
      if(err) return next()//不是静态文件的匹配
      if(status.isFile()){
       
        fs.createReadStream(newP).pipe(res)
      }
    })
  }
}
app.use(static('pages')) */

app.get('/',function(req,res){
  res.setHeader('location','https://www.baidu.com')
  res.statusCode = 302
  res.end()
 /*  res.redirect('https://www.baidu.com') */
})