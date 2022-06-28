exports.allUser = (ctx, next) => {
    ctx.body = {
        name: 'amsc30',
        age: 12
    }
    next()
}
