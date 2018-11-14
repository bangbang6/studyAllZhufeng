
class EventEmitter
{
 constructor(){
   this._events = {}
 }      
 on(name,fn){
   
   if(!this._events[name]) this._events[name] = [fn]
   else this._events[name].push(fn)
 }
 removeListener(name,fn){
  
  //从数组中删除指定元素用filter
this._events[name] = this._events[name].filter(item=>item!=fn)
 }
 emit(name){
   this._events[name].forEach(element => {
     element()
   });
 }
 once(name,fn){
   var that  = this
   let cb = function(){
     fn()
     that.removeListener(name,cb)
   }
   this.on(name,cb)
 }
}

let girl  = new EventEmitter()
girl.once('失恋',function(){
  console.log('哭')
})
let fn = function(){
  console.log('吃')
}
girl.on('失恋',fn)
girl.removeListener('失恋',fn)//fn不能直接写回调函数,因为fn是个函数,你写回调的话的意思是异步调用回调函数
girl.emit('失恋')
girl.emit('失恋')