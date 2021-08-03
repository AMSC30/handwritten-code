const errorType = require('../constants/error-types')
const userService = require('../service/user')
exports.verifyUer = async (ctx, next) => {
	const { account, password } = ctx.request.body

	// 校验必填
	if (!account || !password) {
		const error = new Error(errorType.NO_ACCOUNT_OR_PASSWORD.message)
		return ctx.app.emit('error', error, ctx)
	}
	// 校验用户是否存在
	const accountResult = await userService.isExist(account)
	if (accountResult.length === 0) {
		const error = new Error(errorType.NO_USER.message)
		return ctx.app.emit('error', error, ctx)
	}

	// 登录
	const loginResult = await userService.login(account, password)
	if (loginResult.length === 0) {
		const error = new Error(errorType.WRONG_PASSWORD.message)
		return ctx.app.emit('error', error, ctx)
	}
	ctx.body = {
		message: loginResult[0]
	}

	await next()
}
