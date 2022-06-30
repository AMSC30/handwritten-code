const fs = require('fs')
const { loginVerify } = require('../controller/user')
module.exports = app => {
    app.use(loginVerify)
    fs.readdirSync(__dirname).forEach(item => {
        if (!['router.js'].includes(item)) {
            const router = require('./' + item)
            app.use(router.routes()).use(router.allowedMethods())
        }
    })
}
