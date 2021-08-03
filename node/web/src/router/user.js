const router = new require('koa-router')()
const { login, addUser, getUserInfo } = require('../controller/user')
const { verifyUser } = require('../middleware/user')
router.post('/login', verifyUser, login)
router.post('/addUser', addUser)
router.get('/getUserInfo', getUserInfo)
module.exports = router
