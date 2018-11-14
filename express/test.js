console.log(require('path').resolve(__dirname,'/index.html')) //c盘下的index.html
console.log(require('path').join(__dirname,'/index.html')) //直接在后面加
console.log(require('path').join(__dirname,'../index.html'))
console.log(require('path').resolve(__dirname,'../index.html'))
//区别