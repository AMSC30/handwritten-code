const fs = require('fs')

// fs.stat('./http.js', (err, data) => {
// 	if (err) {
// 		console.error(err)
// 		return
// 	}
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

// dir曾删改查
fs.mkdir('./test', () => {
	fs.readdir('./test', (err, data) => {
		console.log(data)
		fs.rename('./test', './test1', () => {
			setTimeout(() => {
				fs.rmdir('./test1', () => {})
			}, 2000)
		})
	})
})

// const rs = fs.createReadStream('./images/wall-paper.jpg')
// const ws = fs.createWriteStream('./images/wall-paper-copy.jpg')
