const Router = require('@koa/router')
const User = require('../controller/user.js')
const router = new Router({
    prefix: '/user'
})
router.get('/', User.allUser)
module.exports = router
