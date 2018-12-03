//理解生成器和迭代器的代码
//read生成器 return的 对象是迭代器
/* function read(books){
  let index = 0
 
  return {
    
    next(){
   
      let done = index == books.length
      let value =done?'undefined':books[index++]
      return {
        value,
        done
      }
    }
  }
}
let diedai = read(['js','node'])
let result
do{
  result = diedai.next()
  console.log(result)
}while(!result.done) */

//使用

function *read(books){
  for(let i=0;i<books.length;i++){
    yield books[i]
  }
}

let diedai = read(['js','node'])
let result
do{
  result = diedai.next()
  console.log(result)
}while(!result.done) 


//map set
let arr = [1,1,3,4]
console.log(new Set(arr))