//手写middware中间件 next实现原理


function app(){

}
app.middware = []//[(req,res,next)]

app.use = function(cb){
   app.middware.push(cb)
}

app.use(function(req,res,next){
  console.log(1)
  next()
})

app.use(function(req,res,next){
  console.log(2)
  next()
})
app.use(function(req,res,next){
  console.log(3)
})
let index = 0
function next(){
  app.middware[index++].call(app,null,null,next)
  
}
next()
