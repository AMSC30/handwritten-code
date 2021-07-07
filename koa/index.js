const Koa = require('koa')
const app = new Koa()
app.use(async ctx => {
	ctx.body = 'hello'
	if (ctx.url === '/') {
		console.log(ctx)
	}
})

app.listen(3000)
