let express = require('express')

let router = express.Router()

router.post('/login',function(req,res){
  console.log(req.body)
  console.log(1)
  //res新增方法 res.send res.json req.body这个是要自己在中间件加 res.sendfile
  //ejs服务器渲染页面
  res.render('index.html',{...req.body,a:[0,1,2]})
})

module.exports = router