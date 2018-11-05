
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
  
  
let str = require(1)

  let style = document.createElement('style')
    style.innerText = "body{  background-color: red}"
  document.head.appendChild(style)

  
console.log('bang'+str)
  
  /***/ }),
  /* 1 */
  /***/ (function(module, exports) {
  module.exports = 'this is A'  
  /***/ })
   ]);
