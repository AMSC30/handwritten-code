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
    ctx.body = { name: 'tom', age: 12 }

    next()
}
