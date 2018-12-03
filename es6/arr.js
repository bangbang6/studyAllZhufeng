//深拷贝
/* function copy(obj){
  let result = {}
  //其实还要对数组对象的饶仑,这里不写
  for(let key in obj){
    if(typeof obj[key] !== 'object'){
      result[key] = obj[key]
    }else{
      result[key] = copy(obj[key])
    }
    
  }
  return result
}
let obj={name:1,age:2}
console.log(copy(obj)) */

//对reduce等方法重写

Array.prototype.myReduce=function(fn,initvalue){
  for(let i=0;i<this.length;i++){
    initvalue = fn(initvalue,this[i],i,this)
  }
  return initvalue
}

let arr = [1,2,3]
let a = arr.reduce(function(value,item,index,origin){
  return value + item
},0)
console.log(a)
console.log(Array.of(1,2))
Array.prototype.myFilter = function(fn){
  let result = []
 for(let i = 0 ;i<this.length;i++){
   let flag = fn(this[i])
   if(flag){
     result.push(this[i])
   }
 }
 return result
}
console.log(arr.myFilter(item=>{
  return item>=2
}))

Array.prototype.myevery = function(fn){
 for(let i =0;i<this.length;i++){
   let flag = fn(this[i])
   if(!flag) return false
 }
 return true
}
console.log(arr.myevery(item=>{
  return item>=2
}))
let obj1 = {
  name:1
}
let obj2 = {}
//Object.setPrototypeOf(obj2,obj1)
obj2.__proto__ = obj1
console.log(obj2.name)