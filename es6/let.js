


/* let a = 10;


//a is not defined 因为块级作用域里面有a所以不找外面的 但是不会变量提升,所以Undefined
(function(){
 console.log(a)
 let a = 20
})()
 */

/* {
  var b =10
}
console.log(b)
//var 定义的全在全局上 */
//i在全局上是一个变量 如果采用let那么作用域里面每次都产生一个i才能有效果
/* for(var i=0;i<3;i++){
 setTimeout(() => {
   console.log(i)
 }, 1000);
} */
//const 也是块级作用域
/* {
  const o = 10
}
console.log(o) */


//模板字符串
/* let name = 'bang'
let i = `
<ul>
  <li>${name}</li>

</ul>

` */

/* var a = 'sadasdasd${name}'
function des(desc){
   return desc.replace(/\$\{[^\}]+\}/g,function(){
      return eval(arguments[1])
    })

}
console.log(des(a))

//带标签的模板字符串 主要是为了定义自己的模板规则
var age = 20,name='bang'
//扩展运算符只能用在最后一个

function desc(strings,...values){
  console.log(strings)//相当于正则匹配'${}'然后对其进行split
  console.log(values)
 let result = ''
 for(var i=0;i<values.length;i++){
   result+=strings[i]+values[i]
 }
  return result+strings[strings.length-1]
}
let str =  desc`${name} 今年 ${age} 岁啦`
console.log(str) */

/* var str = 'bang'
console.log(str.startsWith('b'),str.endsWith('g'),str.includes('an')) */