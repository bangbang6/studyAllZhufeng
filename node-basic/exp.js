let s = 'cat,bat'
let p = /.(at)/g

//exec key循环往下 /.(at)/第一步是cat和at 接着调用时 bat和at
// match 只能不能匹配括号/.(at)/不能匹配at,只能匹配cat和bat

console.log(s.match(p))