

/* for(let i in [1,2,3]){
    console.log([1,2,3].hasOwnProperty(i))
}
console.log(Object.keys([1,2,3])) */

 //可知数组就是{0:xx,1:xx}的对象
function deepClone(parent,child){
    child = child? child:{}
    for(let key in parent){
        if(parent.hasOwnProperty(key)){
            
            if( typeof parent[key] == 'object'){
              child[key] = Object.prototype.toString.call(parent[key]) == '[object Object]' ?{}:[]
              
              deepClone(parent[key],child[key])
            }else{
                child[key] = parent[key]
            }
        }
    }
    return child
}

let a = {
    age:1,
    hby:{name:1},
    lick:[1,2,{name:222}]
}
let b = {}
b = deepClone(a,b)
b.lick.name = 333
console.log(a,b)