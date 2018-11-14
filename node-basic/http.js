//服务器就像一个房子 他有ip地址共有ip 访问ip地址可以访问到改服务器,但是ip地址不方便记忆,所以可以给服务器绑定域名,通过域名解析(DNS解析)
//来获取ip地址从而找到服务器,房子可能有很多家店对应很多端口,不同的端口放置静态文件(.html.css)也可以放数据库(通过函数调用数据库)
//例子:baidu:8000 =>baidu的域名解析到百度的ip地址找到8000的房间再通过/inedx.html来访问静态资源,或者/getUser之类来操作对应房间里定义的接口操作数据库



let http = require('http')
let port = 3000
let url = require('url')
let fs = require('fs')
let path  = require('path')
let mine = {
  '.js':'application/x-javascript',
  '.css':'text/css',
  '.html':'text/html'
}
//下面手写一个http处理静态文件
//穿件一个服务器 和买的服务器一样说明1-3行 在电脑上起一个服务器,让他监听port端口,ip地址就是代码部署的服务器,本地的话就是localhost
http.createServer(function(req,res){//请求端口的回调
  //访问文件不存在返回404
  //访问目录,或者/ 返回下面的index.html
  console.log(req.url)

  let urlObj = url.parse(req.url,true)//true代表query对象化
 /*  protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,//Host+port
  hash: null,
  search: null,
  query: null,
  pathname: '/', //表示不带请求参数的路径
  path: '/',
  href: '/' } */
  console.log(urlObj)
  let pathname = urlObj.pathname
 
//动态接口 即是路由 :更具不同路径返回不同结果
if(pathname == '/clock'){
   console.log(1)
  return // 一定要return 因为没return的话 还会去找静态资源
}

if(req.method == 'OPTIONS'){//试探的请求,我们直接让他成功
  res.end()
}
//req.body  如果你想获取body内容 不能用req.body req.query 这些都在express封装 原生要用url.parse 因为没封装这个方法,在express中可以庸在原生里面只能
//因为req是一个流 所以req.on(data,function(chunk){str+=chunk})来获取
  //静态文件
  fs.stat('.'+pathname,function(err,stats){
    if(err){
      res.statusCode = 404
      res.setHeader('content-type','text/plain;charset=utf-8')
      res.end(pathname+'不存在')
    }
    else if(stats.isFile()){
      let matchs = ('.'+pathname).match(/\.\w+$/)
      console.log(matchs[0])
      
      res.setHeader('content-type',mine[matchs[0]]+';charset=utf-8')
      fs.createReadStream('.'+pathname).pipe(res)
     
    }else if(stats.isDirectory()){
      let newp = path.join('.'+pathname,'./index.html')
      fs.stat(newp,function(err1,stats1){
        if(err1){
          res.statusCode = 404
          res.end(newp+'不存在')
        }else{
          res.setHeader('content-type','text/html'+';charset=utf-8')
          fs.createReadStream(newp).pipe(res)
        }
    })
    
  }
  })

}).listen(port,function(){//端口成功监听的回调
 console.log('服务器在'+port)
})