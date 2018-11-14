//express 封装啦http的大部分方法关键是
/* 1.拓展啦req,res的属性/方法 以前只能res.end()字符串 现在 res.json()可以返回对象 res.sendFile()返回文件

2.采用啦中间件的东西,使得相同的代码可以提出来,比如setHeader之累的
3. 不用设置头啦 直接res.send( )和res.end()+头防止乱码 一样效果  res.json,res.senfile res扩展的方法都处理啦乱码res.end()没处理
 */
//res.send() 自己会判断里面数据类型,来达到json statuscode 得效果

let express = require('express')
let app  = express() // 这里的app就是http.createserver的回调函数

/* app.listen(3000)//在1回调函数上拓展啦一个方法叫listen可以监听端口 */

/* 我们自己实现一个监听函数 */

app.listen1 = function(...args){
  require('http').createServer(app).listen(...args)
}
app.listen1(3000,function(){
 console.log('开启在3000')
})


/* //编写param规范,req,res和后面的接口的是一个东西,可以改变和扩展属性
//param和querey区别 query是参数 指的是传过来?的参数 params是匹配类型 和路径匹配上的对象
app.param('a',function(req,res,next){//必须给出拦截哪个参数
  req.param.a = '我就是'
  next()
}) */




//下面手写一个匹配路径/:a 变成req.params的实现
// 匹配user/:id/:name/a user/1/2/a 最后结果{id:1,name:2}
/* var url = '/user/:id/:name/a'
var url2 = '/user/1/2/a'
//先取出URl1的id和name 改成正则表达式去匹配URL2
var paramss = {}
var arr = []
var newE = url.replace(/:[^\/]+/g,function(){

  arr.push(arguments[0].slice(1))
  return `([^\/]+)`
})

var newExp = new RegExp(newE)
var arr2 = url2.match(newExp)
//exec match 只是返回一个数组 不能有回调函数
console.log(arr2)
console.log(arr)
arr.forEach((item,index)=>{
  if(!paramss[item]) paramss[item] = arr2[index+1] 
})
console.log(paramss) */




//下面是中间件的实现 
//1.默认路径是/匹配所有开头为参数的路径 如果设为clock那么是开头是/clock的路径
//2.验证权限
//3.提取公共代码
//4.计算哪个接口时间快 装饰模式:对一个函数进行增加修饰,
/* 例 a()我们要给a执行的方法里加一个语句
只要
let c = a
function a(...args){
  console.log('add')
  c.call(this,...args)
} 就能增加功能*/
app.use('/',function(req,res,next){
  res.header('content-type','text/plain;charset=utf-8')//公共代码设置头取出
  let t = new Date().getTime()
  let en = res.end
  res.end = function(...args){ //修饰模式改写end方法
    console.log(new Date().getTime() - t)
     en.call(res,...args)
  }
  next()
  /* next('错误') *///会直接跳过下面的验证 找到最后的中间件打印错误信息
})


//设计接口 路由都是严格匹配只能匹配一个不会往下找,中间件会一直往下匹配
 //在app上拓展方法 名字为http verb
app.get('/clock/:a',function(req,res){
  //扩展啦两个方法

  console.log(req.path)//不包含?的路径
  console.log(req.url)//包含问好的路径
  console.log(req.query)//传的参数对象
  for(var i = 0;i<10000000;i++){

  }
  res.end('借宿')
})

app.get('/clock/',function(req,res){
  //扩展啦两个方法

  console.log(req.path)//不包含?的路径
  console.log(req.url)//包含问好的路径
  console.log(req.query)//传的参数对象
  for(var i = 0;i<1000000000;i++){
    
  }
  res.end('aaa')
})


app.use(function(err,req,res,next){
  console.log(err)
})

//静态文件的话默认写好规则 写静态目录必须xpress.static()