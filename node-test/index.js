const Koa = require('koa')
const app = new Koa()
const fs = require('fs')
app.use(async ctx => {
	if (ctx.request.url == '/') {
		ctx.status = 200
		ctx.body = {
			code: 1,
			msg: 'success',
			data: {
				name: 'amsc30',
				age: 26
			}
		}
	} else if (ctx.request.url === '/index.html') {
		fs.readFile('../拖拽实现/dag.html', (error, data) => {
			if (error) {
				ctx.status = 500
			} else {
				ctx.type = 'text/html'
				ctx.status = 200
				ctx.body = data
			}
		})
	}
})

app.listen(3000)
