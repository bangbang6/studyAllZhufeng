//es6的class用es5的function 实现

class Parent {
  constructor(name){
    this.name = name
  }
  //类圆形上的属性
  getname(){
    console.log(this.name)
  }
  //类上的属性 静态
  static hello(){
    console.log('hello')
  }
}
let a = new Parent('aaa')
console.log(a.getname())

//下面用函数来实现
//立即执行函数
//类里面穿this代表实例很重要
/* var Parent = function(){
  //构造函数
  function Parent(name){
    _callback(this,Parent)//检查类不是函数
    this.name = name
  }
  function _callback(instance,constructor){
  if(instance instanceof constructor) throw new Error('dont use without new')
  }
  setpropes(Parent,[{
    key:getname,
    value:function getname(){
      console.log(this.name)
    }
  }],[{
    key:hello,
    value:function hello(){
     console.log('hello')
    }
  }])

  
}()

var  setpropes = function(){

  function definePros(target,pros){
      for(let i = 0 ;i<pros.length;i++){
        let desctiptor = pros[i]
        desctiptor.enumerable = desctiptor.enumerable ||false
        desctiptor.configurable = true
        if('value' in desctiptor){
          desctiptor.writable = true
        }
        Object.defineProperty(target,desctiptor.key,desctiptor.value)
      } 
  }

 return function(constructor,propes,staticPros){
   if(propes) definePros(constructor.prototype,propes)
   if(staticPros) definePros(constructor,staticPros)
   return constructor
 }
}() */





//类的继承 本质是__proto__的链接 通过__proto__依次向上查找
//所以要写继承本质是child.prototype.__proto__ = parent.prototype 来继承关系 //只要实现这个就能实现继承
//默认new fn()实例的_proto__指向fn.prototype
//下面写一个es5的继承
class superParent{
 constructor(name){this.name = name}
}
class Parent{
  constructor(name,age){super(name);this.age = age}
}
//这里假设parent是子类,superPar是父类
var Parent = function(superParent){
  //构造函数
  _inherits(Parent,superParent)
  function Parent(name){
    _callback(this,Parent)//检查类不是函数
    this.name = name
  }
  function _callback(instance,constructor){
  if(instance instanceof constructor) throw new Error('dont use without new')
  }
  setpropes(Parent,[{
    key:getname,
    value:function getname(){
      console.log(this.name)
    }
  }],[{
    key:hello,
    value:function hello(){
     console.log('hello')
    }
  }])

  
}(superParent)

var  setpropes = function(){

  function definePros(target,pros){
      for(let i = 0 ;i<pros.length;i++){
        let desctiptor = pros[i]
        desctiptor.enumerable = desctiptor.enumerable ||false
        desctiptor.configurable = true
        if('value' in desctiptor){
          desctiptor.writable = true
        }
        Object.defineProperty(target,desctiptor.key,desctiptor.value)
      } 
  }

 return function(constructor,propes,staticPros){
   if(propes) definePros(constructor.prototype,propes)
   if(staticPros) definePros(constructor,staticPros)
   return constructor
 }
}()


function _inherits(child,parent){
  if( typeof parent != 'function' && typeof parent != 'null'){
   throw new Error('parent is not a function ')
  }
  if(parent){
    child.prototype = Object.create(parent.prototype,{
      constructor:{
        value:child
      }
    })
  }
  if(parent){//setPrototypeOf 就是实现一个__proto等号
    Object.setPrototypeOf ? Object.setPrototypeOf(child,parent) : child.__proto__ = parent
  }
}
//object.create方法实现 
Object.create = function(prototype){
 let fn = function(){
   
 }
 fn.prototype = prototype
 return new fn()
}