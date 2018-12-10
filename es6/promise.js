

     //手写promiseA+
     function myPromise(task){
       let that = this
       that.status = 'pending'
       that.fullfilledCallbacks = []
       that.rejectedCallbacks = []
       that.value = undefined
      function resolve(value){
        that.status = 'fullfilled'
        that.value = value
        if(value instanceof Promise){
          return value.then(resolve,reject)
        }//如果是promise的话那么先不需要执行结果回调即fullfilled 应该让他继续去寻找内岑的结果
         that.fullfilledCallbacks.forEach(item => {
           return item(value)
         });
      }   
      function reject(value){
        that.status = 'rejected'
        that.value = value
        if(value instanceof Promise){
          return value.then(resolve,reject)
        }
        that.rejectedCallbacks.forEach(item => {
          return item(value)
        });
      }
      try{
        task()
      }catch(e){
        reject(e)
      }
      
     }
     //为了实现x.then.then的形式那么需要在then方法里面自己写一个promise并且return
     //为了实现value可能是promise我们需要一直递归promise直到找到一个数值为止
     myPromise.prototype.then = function(fullfilled,rejected){
        //如果没有传递值那么下传
        fullfilled = typeof fullfilled == 'function' ? fullfilled :function(value){return value}
        rejected = typeof rejected == 'function' ? rejected : function(value){throw value}
        let that = this
        let self = this
        let promise2
        if(that.status == 'fullfilled'){
          promise2 = new Promise(function(resolve,reject){
             let x = fullfilled(self.value)
             resolvePromise(promise2,x,resolve,reject)
          })
          
        }else if(that.status == 'rejected'){
          promise2 = new Promise(function(resolve,reject){
            let x = rejected(self.value)
            resolvePromise(promise2,x,resolve,reject)
         })
        }else if(that.status == 'pending'){
          promise2 = new Promise(function(resolve,reject){
            that.fullfilledCallbacks.push(function(){
              let x = fullfilled(self.value)
              resolvePromise(promise2,x,resolve,reject)
            })
            that.rejectedCallbacks.push(function(){
              let x = rejected(self.value)
              resolvePromise(promise2,x,resolve,reject)
            })
         })
           
        }
        return promise2
     }
      //看最终的结果 在传入总的fullfilled函数去执行
     function resolvePromise(promise2,x,resolve,reject){
        if(promise2 == x){ throw new Error('无限递归')}
          let then
        if(x instanceof Promise){
          x.then(function(y){
            resolvePromise(promise2,y,resolve,reject)
          },reject)
        }else if(x!=null && (typeof x == 'function' || typeof x == 'object')){
          try{
            then = x.then;
            if(typeof then == 'function'){
             then.call(x,function(y){
               resolvePromise(promise2,y,resolve,reject)
             },reject);
            }else{reslove(x)}
          }catch(e){
            reject(e);
          };
        }else{
          resolve(x)
        }
     }

     //手写实现all,race,reslove方法

    myPromise.all = function(promises){
        let result = []
        let count = 0
    return new Promise(function(resolve,reject){
      for(let i  = 0;i<promises.length;i++){
          promises[i].then(function(value){
            result[i] = value
            if(++count == promises.length){
                resolve(result)
            }
          },reject)
        } 
     })
    }

    myPromise.race = function(promises){
      return new Promise(function(reslove,reject){
        promises.forEach(item=>{
          item.then(function(value){
            reslove(value)
          },reject)
        })
      })
    }

    myPromise.reslove = function(value){
      return new Promise(function(reslove,reject){
          reslove(value)
      })
    }
    myPromise.reject = function(value){
      return new Promise(function(reslove,reject){
          reject(value)
      })
    }

    Promise.prototype.catch = function(onRejected) {
      return this.then(null, onRejected);
  }

  //foreach里面假如是异步 那么要根据时间谁快来先执行谁
 let p1= new Promise(function(reslove,reject){
      setTimeout(()=>{
          reslove(1)
      },2000)
 })
 let p2 =  new Promise(function(reslove,reject){
    setTimeout(()=>{
      reslove(2)
    },1000)
})
  function race(promises){
   /*  promises.forEach((item,index)=>{
       item.then(function(){
         console.log('index',index)
       })
    }) */
    for(let i = 0 ; i<promises.length;i++){
        promises[i].then(function(){
            console.log('index',i)
        })
    }
  }

  race([p1,p2])


  function a(){
      setTimeout(()=>{
          console.log(0)
      },3000)
  }
  function b(){
    setTimeout(()=>{
        console.log(1)
    },1000)
}
function c(){
    setTimeout(()=>{
        console.log(2)
    },0)
}
function d(){
    console.log(4)
}
[a,b,c,d].forEach((item,index)=>{
    item.call(null)
})