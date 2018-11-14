






//浅拷贝 (slice,object.assign,{...{}}) 基本上就是把地址给复制,如果不是引用类型,那么value就没地址,那么是隔离的,如果是对象,那么给的是value地址,那么就会相互影响
//深拷贝(递归循环,parse(strigy)->不支持函数(会丢失))

var obj = {name:1} ;
  var arr = [obj,1,2];
  var newA =  arr.slice(0)
  newA[1] = 2
  console.log(arr)

  var obj = {name:1} ;
  var newObj = Object.assign({},obj) 
  newObj.name = 2
  console.log(obj) // 1因为这里的value是数字而不是对象,必须value是对象才能有效果

  var obj = {name:{name:1}} ;
  var newObj = Object.assign({},obj) 
  newObj.name.name = 2
  console.log(obj)


//fill js/buffer是以16进制存数据第
var buf = Buffer.alloc(10)

buf.fill('我是',0,6)
buf = buf.slice(0,6)
console.log(buf.toString())

//slice浅拷贝,因为直接内存截取

//copy

var buf = Buffer.from('廖')
var buf2  = Buffer.from('振')
var buf3 = Buffer.alloc(6)

buf.copy(buf3,0)
buf2.copy(buf3,3)
console.log(buf3.toString())

//concat

var buf = Buffer.from('廖')
var buf2  = Buffer.from('振')
var buf3 = Buffer.concat([buf,buf2])
console.log(buf3.toString())

//手写一个concat

Buffer.myConcat = function(list,length){


  var totalLength = 0
  if(typeof length == 'undefined'){
    totalLength = list.reduce((pre,next)=>{return pre+next.length},0)
  }else{
    totalLength = length
  }
  
 var buf =  Buffer.alloc(totalLength)
 var offset = 0
 list.forEach(item => {
   if(!Buffer.isBuffer(item)) throw new Error('不是buffer')
   item.copy(buf,offset)
   offset += item.length
 });

 if(length > buf.length) {
   buf = buf.slice(0,buf.length)
 }

 return buf
}

var buf = Buffer.from('廖')
var buf2  = Buffer.from('振')
var buf3 = Buffer.myConcat([buf,buf2])
console.log(buf3.toString())


//base64解码  把汉字的3个字节即24 转成6*4的形式,在字节前补两个0,在转成10进制,再对照解码表

var buf = Buffer.from('廖')

console.log(buf.toString('base64'))

//编码过程

console.log(buf) //e5 bb 96
//转成2进制
console.log(0xe5.toString(2))
console.log(0xbb.toString(2))
console.log(0x96.toString(2))

//11100101
//10111011
//10010110
//变成 00111001 00011011 00101110 00010110

//数字 
console.log(parseInt('00111001',2))
console.log(parseInt('00011011',2))
console.log(parseInt('00101110',2))
console.log(parseInt('00010110',2))
//57
//27
//46
//22

var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +'abcdefghijklmnopqrstuvwxyz' + '0123456789' +'+/'

console.log(str[57]+str[27]+str[46]+str[22]) //得到base64编码

//下表该字符串没用,因为字符串是一个块区域,不同数组是各个区域连起来
var str = '廖振邦'
str[0] = '邦'
console.log(str)
