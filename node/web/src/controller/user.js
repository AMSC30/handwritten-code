const { addUser, isExist, getUserInfo } = require('../service/user')
exports.login = async (ctx, next) => {
	await next()
}
exports.addUser = async (ctx, next) => {
	const { account, password, name, age } = ctx.request.body
	const result = await isExist(account)
	if (result.length) {
		ctx.body = {
			message: '该用户已存在'
		}
		return
	}

	await addUser(account, password, name, age)

	ctx.body = {
		message: '成功'
	}
	next()
}
exports.getUserInfo = async (ctx, next) => {
	const { id } = ctx.request.query
	const result = await getUserInfo(id)

	if (result.length) {
		ctx.body = result[0]
	}
	next()
}
