const static = require('koa-static')
const path = require('path')

module.exports = static(path.join(__dirname, './static'))
