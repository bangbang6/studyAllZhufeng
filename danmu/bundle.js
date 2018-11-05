let data = [
  {value:'第一条测试',fontSize:20,color:'red',speed:2,time:0,},
  {value:'第二条测试',time:1}
]
//外部类封装不彻底,想用面向对象思维那么不需要多少外部变量和方法,所以ctx,video应该都在DANMU类中
let $ = document.querySelector.bind(document)

let canvas = $('#canvas')
let video = $('#video')
let name = $('#text')
let submit = $('#submit')
let range = $('#range')
let colorE = $("#color")

let ctx = canvas.getContext('2d') 




class SingleDanmu{
  constructor(options){
    let defaultOptions = {
      color:'red',
      fontSize:16,
      speed:2
    }
    this.value = options.value
    this.time = options.time
    this.color = options.color || defaultOptions.color
    this.fontSize = options.fontSize || defaultOptions.fontSize
    this.speed = options.speed || defaultOptions.speed 
    this.init()
    //初始化成功后,就该在主类中让其运动
  }
  init(){
    //计算单个弹幕的高宽以及出现的x,y值
    let span = document.createElement('span')
    span.innerText = this.value
    span.style.fontSize = this.fontSize + 'px'
    span.style.position = 'absolute'
    console.log(span)
    document.body.appendChild(span)
    this.width = span.clientWidth
    this.height = span.clientHeight
    console.log(span.clientWidth,this.height)
   document.body.removeChild(span)
    //计算x,y值
    this.x = canvas.clientWidth

    this.y = canvas.clientHeight * Math.random()

    //让弹幕不显示一半

    if(this.y < this.height){
      this.y = this.height
    }

    if(this.y + this.height > canvas.clientHeight){
      this.y = canvas.clientHeight - this.height   
    }
    
  }
  render(){
    //渲染其实就是canvas画图操作
    
    if(!this.flag){
       
      //执行一次就让this.x - this.speedd
      this.x = this.x - this.speed
      /* console.log('x',this.x) */
      //画在画布上
      ctx.fillStyle = this.color
      ctx.font = "bold  "+ this.fontSize+'px' +"  Arial"
      ctx.fillText(this.value,this.x,this.y)
    }
    
    


    //弹幕出去后处理

    if(this.x < -this.width){
      /* console.log('width',this.width) */
            this.flag = true//不让他画啦
    }
  }
}
class Danmu{
  constructor(data){
    this.data = data
    this.init()
  

    
  }
  reset(){
    ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight)//清空画布

    let time = video.currentTime
    this.danmus.forEach(item=>{
      item.flag = false
      if(time<=item.time){
        item.x= canvas.clientWidth
        item.render()
      }else{
        item.flag = true
      }
    })
  }
  add(obj){
    this.danmus.push(new SingleDanmu(obj))
  }
  init(){
    canvas.width = video.clientWidth
    canvas.height = video.clientHeight
    let danmus = []
    data.forEach(item => {
      danmus.push(new SingleDanmu(item))
    });
    this.danmus = danmus//对象是danmu对象
    this.play = false
    
      this.render()
    
   
  }
  //让数组中的弹幕对象动起来
  render(){
    ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight)//清空画布
    console.log(this.play)
    this.danmuRender()
    if(this.play){
      requestAnimationFrame(this.render.bind(this)) 
    }
    //创建动画让其动起来,每一帧执行一次回调函数
   
  }
  danmuRender(){
    
    let currentTime = video.currentTime
    
    this.danmus.forEach(danmu=>{
      //判断是否时间到啦
      if(currentTime >= danmu.time){
        //到啦就让弹幕渲染
        danmu.render()
      }
    })  
  }
}



let Ddanmu = new Danmu(data)

video.addEventListener('play',function(){
  
  Ddanmu.play = true
  Ddanmu.render()
 })
 video.addEventListener('pause',function(){
  Ddanmu.play = false
 })
 video.addEventListener('seeked',function(){
  Ddanmu.reset()
})


/* let name = $('#text')
let submit = $('#submit')
let range = $('range')
let color = $("color") */

let socket = new WebSocket("ws://localhost:3000")
socket.onopen=function(){
      socket.onmessage = function(e){
        let message = e.data
        message = JSON.parse(message)
        if(message.type == 'ADD'){
          Ddanmu.add(message.data)
        }
      }
}
submit.addEventListener('click',function(e){
  let value = name.value
  let fontSize = range.value
  let color = colorE.value
  let time = video.currentTime
  let speed = 2
  let obj = {value,fontSize,color,time}
  socket.send(JSON.stringify(obj))
  //Ddanmu.add(obj)
})