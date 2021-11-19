// Console类
const { Console } = require('console')
const fs = require('fs')
const write = fs.createWriteStream('./log.txt')
const myConsole = new Console({ stdout: write, stderr: write })
// myConsole.log('hello')
// myConsole.log('log')
// myConsole.error('hello')

// log
console.log('hello')

// clear
// console.clear();

// assert
// myConsole.assert(false, 'assert')

// error
// console.error('error');

// count
// console.count('label');
// console.count('label');

// countRest
// console.count('label');
// console.count('label');
// console.countReset('label');
// console.count('label');

// table
// myConsole.table([
// 	{ a: 'a1', b: 'b1' },
// 	{ a: 'a2', b: 'b2' }
// ])

// time
// console.time('label');
// setTimeout(() => {
// 	console.timeEnd('label');
// }, 200);
