const jwt = require('jsonwebtoken')

const { addUser, isExist, getUserInfo } = require('../service/user')
const config = require('../app/config')

exports.login = async (ctx, next) => {
	try {
		const { account, password } = ctx.request.body

		const token = jwt.sign({ account, password }, config.privateKey, {
			algorithm: 'RS256',
			expiresIn: '1h'
		})

		ctx.body = { token }
	} catch (error) {
		console.log(error)
	}

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
	await next()
}
exports.getUserInfo = async (ctx, next) => {
	const { id } = ctx.request.query

	// const token = ctx.get('token')

	// if (!token) {
	// 	ctx.status = 401
	// 	ctx.body = {
	// 		message: '请先登录'
	// 	}
	// } else {
	// 	const key = fs
	// 		.readFileSync(path.resolve(__dirname, '../constants', 'public.key'))
	// 		.toString()
	// 	const user = jwt.verify(token, key, {
	// 		algorithms: ['RS256']
	// 	})
	// }

	const result = await getUserInfo(id)

	if (result.length) {
		ctx.body = result[0]
	}
	next()
}
