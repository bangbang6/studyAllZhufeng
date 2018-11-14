let express = require('express')

let app = express()
app.listen(3000)
let user = require('./ruoter')
app.engine('html',require('ejs').__express)
app.set('views','pages')
app.set('view engine','html')
//手写bodyparser
function bodyParser(){
  return function(req,res,next){
    //输入流来获取数据放在req.body属性上
    var str = ''
    var obj = {}
    req.on('data',function(chunk){
      str = str + chunk
    })
    req.on('end',function(){
      //假设是表单数据 不是对象数据 例如 username=aaa&password=bbb怎么变成对象
      console.log(str)
      //replace有回调函数 可以返回替代品也可以不返回 exec和matvh没回调
      str.replace(/([^=&]+)=([^=&]+)/g,function(){
        console.log(arguments)
          obj[arguments[1]] = arguments[2]
      })
      console.log(obj)
      req.body = obj
      next()
    })
   
  }
}
app.use(bodyParser())
app.use('/user',user) //user即router也是一个函数 当匹配/user开头的路径是会去user里面找的