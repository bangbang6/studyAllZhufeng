let WebSocket = require('ws')


let wss = new WebSocket.Server({port:3000})
let clientArr = []
wss.on('connection',function(ws){
  clientArr.push(ws)
  ws.on('message',function(data){
    console.log(data)
    clientArr.forEach(item=>{
      item.send(JSON.stringify({type:'ADD',data:JSON.parse(data)}))
    })
    
  })
})