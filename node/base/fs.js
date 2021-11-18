const fs = require('fs')
const path = require('path')
// fs.access('./http.js', (err, data) => {
// 	console.log(data)
// })
// fs.stat('./http.js', (err, data) => {
// 	if (err) {
// 		console.error(err)
// 		return
// 	}
// 	console.log(data)
// 	console.log(data.isFile())
// 	console.log(data.isDirectory())
// 	console.log(data.size)
// 	console.log(data.isSymbolicLink())
// 	console.log(data.birthtime)
// })

// fs.stat('../base', (err, data) => {
// 	if (err) {
// 		console.error(err)
// 		return
// 	}
// 	console.log(data.isFile())
// 	console.log(data.isDirectory())
// 	console.log(data.size) // 返回文件占多少字节
// 	console.log(data.isSymbolicLink())
// 	console.log(data.birthtime)
// })

// fs.readFile('./http.js', (error, data) => {
// 	if (!error) {
// 		console.log(data.buffer)
// 	} else {
// 		console.log(error.message)
// 	}
// })

// fs.readFile('./fs.js', 'utf8', (err, data) => {
// 	fs.writeFile('./fs.copy.js', data, () => {})
// })

// fs.appendFile('./fs.js', 'rs.pipe(ws)', () => {})

// fs.copyFile('./buffer.js', './buffer.copy.js', e => {
// 	if (e) {
// 		console.log(e)
// 	}
// })

// dir曾删改查
// fs.mkdir('./test', () => {
// 	fs.readdir('./test', (err, data) => {
// 		console.log(data)
// 		fs.rename('./test', './test1', () => {
// 			setTimeout(() => {
// 				fs.rmdir('./test1', () => {})
// 			}, 2000)
// 		})
// 	})
// })
// fs.mkdir('./test/test/test-dir', { recursive: true }, (err, path) => {
// 	console.log(err, path)
// })
// fs.readdir('./buffer.js', (err, data) => {
// 	if (err) {
// 		console.log(err.message)
// 		return
// 	}
// 	const pathName = path.join('./test', data[0])
// 	fs.stat(pathName, (err, data) => {
// 		if (!err) {
// 			console.log(data.isFile())
// 			console.log(data.isDirectory())
// 		}
// 	})
// })
// fs.rename('./test/test2/test-dir', './test/test/test-1121', e => {
// 	if (e) {
// 		console.log(e.message)
// 	}
// })

fs.rm('./test', { recursive: true, force: true }, () => {})

// fs.watch('./buffer.js', (type, name) => {
// 	console.log(name)
// })
// setTimeout(() => {
// 	fs.unwatchFile('./buffer.js')
// }, 3000)
// const rs = fs.createReadStream('./images/wall-paper.jpg')
// const ws = fs.createWriteStream('./images/wal-paper-copy.jpg')
