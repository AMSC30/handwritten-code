const koaStatic = require('koa-static')
const path = require('path')

module.exports = koaStatic(path.join(__dirname, '../../static'), {
    index: 'index.html',
    extensions: ['png', 'jpg', 'jpeg', 'gif', 'ico']
})
