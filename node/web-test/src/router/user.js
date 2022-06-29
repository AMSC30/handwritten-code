const Router = require('@koa/router')
const User = require('../controller/user.js')
const router = new Router({
    prefix: '/user'
})
router.get('/', User.allUser)
router.post('/:id', User.userById)

module.exports = router
