const fs = require('fs')
const http = require('http')
const path = require('path')

const server = http.createServer((req, res) => {
	const start = Date.now()

	// 300ms左右
	// fs.readFile(path.resolve(__dirname, '../images/cli.mp4'), (err, data) => {
	// 	console.log(data.length / 1024 / 1024)
	// 	const end = Date.now()
	// 	console.log(end - start)
	// 	res.end(data)
	// })

	// 1秒左右
	const readStream = fs.createReadStream(path.resolve(__dirname, '../images/cli.mp4'))
	const end = Date.now()
	console.log(end - start)

	readStream.pipe(res)
})

server.listen(8080, () => {
	console.log('start')
})
