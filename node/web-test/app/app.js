// const Koa = require('koa')
const Koa = require('../../koa相关库源码/koa/lib/application.js')
const routerRegister = require('../router/router')
const app = new Koa()

routerRegister(app)

module.exports = app
