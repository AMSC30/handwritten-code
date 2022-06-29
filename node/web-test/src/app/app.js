const Koa = require('koa')
const routerRegister = require('../router/router')
const koaBody = require('../koa-body/koa-body')
const koaStatic = require('../static-server/static-server.js')
const app = new Koa()

app.use(koaStatic).use(koaBody)

routerRegister(app)

module.exports = app
