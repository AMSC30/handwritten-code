const fs = require('fs')
module.exports = app => {
    fs.readdirSync(__dirname).forEach(item => {
        if (!['router.js'].includes(item)) {
            const router = require('./' + item)
            app.use(router.routes()).use(router.allowedMethods())
        }
    })
}
