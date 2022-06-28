const Router = require('@koa/router')
const Menu = require('../controller/menu.js')
const router = new Router({
    prefix: '/menu'
})
router.get('/', Menu.allMenu)
module.exports = router
