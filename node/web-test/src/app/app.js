// const Koa = require('koa')
const Koa = require('koa')
const routerRegister = require('../router/router')
const koaBody = require('koa-body')
const app = new Koa()

app.use(koaBody())
routerRegister(app)

module.exports = app
