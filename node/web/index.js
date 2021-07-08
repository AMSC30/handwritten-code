const Koa = require('koa')
const app = new Koa()

const bodyParser = require('koa-bodyparser')

const router = require('./router')

const static = require('./static')

app.use(bodyParser())

app.use(router.routes())
app.use(router.allowedMethods())

app.use(static)

app.listen(3000)
