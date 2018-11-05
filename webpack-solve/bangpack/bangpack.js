#! /usr/bin/env node
let fs = require('fs')

let entry = './index.js'
let output  = './dist/main.js'
let content = fs.readFileSync(entry,'utf8')
let i = 0
let styleLoader = function(sty){
  return`
  let style = document.createElement('style')
    style.innerText = ${JSON.stringify(sty).replace(/\\r\\n/g,'')}
  document.head.appendChild(style)

  `
}
 
content = content.replace(/require\(['"](.+?)['"]\)/g,function(){
         let name = arguments[1]
         i++
         if(/\.css$/.test(name)){
           i--
           let sty = fs.readFileSync(name,'utf8')
           return styleLoader(sty)
         }
         console.log('name',name)
         return `require(${i})`
})
let template = `
(function(modules) {
function require(moduleId) {
  let installedModules = {}
       var module = installedModules[moduleId] = {
         i: moduleId,
         l: false,
         exports: {}
       };
       modules[moduleId].call(module.exports, module, module.exports, require);
       return module.exports;
     }
     return require(require.s = 0);//单页面一般是0
   })
  
   ([
  /* 0 */
  /***/ (function(module, exports, require) {  
  //require 手写
  
  ${content}
  
  /***/ }),
  /* 1 */
  /***/ (function(module, exports) {
  module.exports = 'this is A'  
  /***/ })
   ]);
`
//有几个模块就数组就几个里面require替换相应的index
fs.writeFileSync('./dist/main.js',template)