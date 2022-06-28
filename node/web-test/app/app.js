const Koa = require('koa')
const routerRegister = require('../router/router')
const app = new Koa()

routerRegister(app)

module.exports = app
