const Router = require('@koa/router')
const File = require('../controller/file.js')
const router = new Router({
    prefix: '/file'
})
router.post('/upload', File.upload)

module.exports = router
