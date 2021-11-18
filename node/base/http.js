const http = require('http')
// http.get('http://www.baidu.com', res => {
// 	console.log(res.headers)
// })
const server = http.createServer((req, res) => {
	console.log(req.headers)
	res.setHeader('set-cookie', 'name=zhengxixuan')
	res.end('hello node.js')
})
console.log(process.pid)
server.listen(3000, () => {
	console.log('server is listening in port 3000')
})

// 类
// http.Agent -> http.Server
// http.ClientRequest -> http.ServerResponse
// http.IncomingMessage -> http.OutgoingMessage

// 方法
// http.get -> http.request -> http.createServer

// 属性
// http.METHODS -> http.STATUS_CODES -> http.maxHeaderSize
// console.log(http)
