const jwt = require('jsonwebtoken')
exports.allUser = (ctx, next) => {
    ctx.body = [
        {
            name: 'tom',
            age: 12
        },
        {
            name: 'jack',
            age: 22
        }
    ]
    next()
}
exports.userById = (ctx, next) => {
    ctx.body = { name: 'tom', age: 1 }

    next()
}
exports.login = (ctx, next) => {
    const { account, password } = ctx.request.body
    const token = jwt.sign({ account, password }, 'damkiuh34r09u323rbnavjaf9uerjfqefqqb09023h43ibcae9uoue5bin')
    ctx.body = { code: 200, data: { account, age: 23, id: 1, token, message: 'success' } }

    next()
}
exports.getUserInfo = (ctx, next) => {
    const token = ctx.request.get('token')
    if (!token) {
        ctx.status = 403
        ctx.body = {
            code: '403'
        }
    } else {
        const info = jwt.verify(token, 'damkiuh34r09u323rbnavjaf9uerjfqefqqb09023h43ibcae9uoue5bin')
        next()
    }
}
