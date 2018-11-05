function Bang(options = {}){
  this.$options = options
  let data = this.$data = this.$options.data
  
  

  observer(data)
 //数据代理到this上
 for(let key in data){
  Object.defineProperty(this,key,{
    enumerable:true,
    get(){
      return this.$data[key]
    },
    set(newV){
      this.$data[key] = newV
    }
  })
 }
 handleComputed.call(this,this)
 
 changeModel(this.$options.el,this)
}

//实现cpmuted
function handleComputed(vm){
  console.log(this)
  let datas = Object.keys(vm.$options.computed) //[c]
  Array.from(datas).forEach(data=>{
    let result = typeof vm.$options.computed[data] == 'function' ? vm.$options.computed[data] : vm.$options.computed[data].get
    console.log(vm.$options.computed[data])
    Object.defineProperty(vm,data,{
      enumerable:true,
      get:result,
      set(){}
    })
  })
}

function replace(node,vm){
  if(node.nodeType == 3){
    let text = node.textContent
    text.replace(/\{\{(.*)\}\}/g,function(){
      let str = arguments[1]
      let arr = str.split('.')//[a,a]
    
      let val = vm
      
      arr.forEach(item=>{
        console.log(val)
       val = val[item]
      })
      new Watcher(vm,str,function(newV){
        node.textContent =  newV
      })//数据改变时候更新
      node.textContent =  val//识别{{}}
    })
  }
  if(node.nodeType == 1){
    let nodeAttrs = node.attributes
    console.log(node.attributes)
    Array.from(nodeAttrs).forEach(attr=>{//attr:{k:v}
         let key = attr.name
         let value = attr.value
         if(key.indexOf('v-') == 0){
          
          node.value = vm[value]
         
         }
         new Watcher(vm,value,function(newV){
          node.value = newV
         })
    })
    Array.from(node.childNodes).forEach(child=>{
          
      replace(child,vm)
    })
  }
}  
//改变页面数据
function changeModel(el,vm){
  vm.$el= document.querySelector(el)
 
  //写入内存
  let newD = document.createDocumentFragment()
  while(child = vm.$el.firstChild){
    
    newD.appendChild(child)
    
  }
  Array.from(newD.childNodes).forEach(child=>{
   replace(child,vm)
  
    
  })
 

  document.querySelector(el).appendChild(newD)
 
}
/* data:{
  a:{a:1}
  b:1
} */

function Observer(data){
   for(let key in data){
     let val = data[key]
     observer(val)
     let sub = new Sub()
     Object.defineProperty(data,key,{
       enumerable:true,
       get(){
         Sub.targrt && sub.addSub( Sub.targrt)
         return val
       },
       set(newVal){
        observer(newVal)
         val = newVal 
         sub.notify()
       }
     })
   }
}


function observer(data){
  if(typeof data != 'object'){
   return
  }
  new Observer(data)
}


//用发布订阅模式解决数据变化时视图相应

function Sub(){
  this.subs = []
}
Sub.prototype.addSub = function(sub){//sub就是watch对象
  this.subs.push(sub)
}
Sub.prototype.notify = function(){
  this.subs.forEach(sub=>{
    sub.update()
  })
}
function Watcher(vm,str,fn){
  let arr = str.split('.')//[a,a]
  this.vm = vm
  this.str = str
  Sub.targrt = this
    let val = vm
    
    arr.forEach(item=>{
      console.log(val)
     val = val[item]
    })
    
    Sub.targrt = null
 this.fn = fn
}
Watcher.prototype.update = function(){
  let val = this.vm
  let arr = this.str.split('.')//[a,a]
  arr.forEach(item=>{
    console.log(val)
   val = val[item]
  })
  this.fn(val)
}