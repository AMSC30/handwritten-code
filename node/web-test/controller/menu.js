exports.allMenu = (ctx, next) => {
    ctx.body = [
        {
            label: '用户管理',
            id: 1
        },
        {
            label: '权限管理',
            id: 2
        }
    ]
    next()
}
