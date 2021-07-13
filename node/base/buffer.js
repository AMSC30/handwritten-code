const hello = Buffer.from('hello')
const nodejs = Buffer.from(' nodejs')
const result = Buffer.concat([hello, nodejs])
console.log(hello, nodejs, result.toString())
