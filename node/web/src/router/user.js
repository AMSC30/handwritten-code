const router = new require('koa-router')()
const { login } = require('../controller/user')
const { verifyUer } = require('../middleware/user')
router.post('/login', verifyUer, login)

module.exports = router
