const Router = require('@koa/router')
const User = require('../controller/user.js')
const router = new Router({
    prefix: '/user'
})
router.get('/', User.allUser)
router.get('/:id', User.userById)
router.post('/login', User.login)
router.post('/info', User.getUserInfo)

module.exports = router
