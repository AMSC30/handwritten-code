const koaBody = require('koa-body')
const path = require('path')

module.exports = koaBody({
    formidable: {
        uploadDir: path.join(__dirname, '../../static/images'),
        keepExtensions: true,
        onFileBegin: (name, file) => {
            console.log(file)
        }
    },
    multipart: true
})
