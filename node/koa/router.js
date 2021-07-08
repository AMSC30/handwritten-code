const Router = require('koa-router')
const router = new Router()

router.get('/get_user', async (ctx, next) => {
	const { query } = require('./sql')
	try {
		const accountSql = `SELECT * FROM user_info WHERE phone=${ctx.query.phone}`

		const result = await query(accountSql)

		ctx.body = result
	} catch (error) {
		ctx.body = 'error'
		console.log(error)
	}
})

router.post('/add_user', async (ctx, next) => {
	const { insert } = require('./sql')
	const body = ctx.request.body
	try {
		const accountSql = `INSERT INTO user_info(name,gender,phone,password) VALUES(?,?,?,?)`
		const params = [body.name, body.gender, body.phone, body.password]

		const result = await insert(accountSql, params)

		console.log(result)

		ctx.body = {
			code: 1,
			msg: 'success',
			data: {
				id: result.insertId
			}
		}
	} catch (error) {
		ctx.body = 'error'
		console.log(error)
	}
})

router.post('/update_user', async (ctx, next) => {
	const { update } = require('./sql')
	const body = ctx.request.body
	try {
		const accountSql = `UPDATE user_info SET name=?,gender=?,phone=?,password=? WHERE ID = ?`

		const params = [body.name, body.gender, body.phone, body.password, body.id]

		await update(accountSql, params)

		ctx.body = {
			code: 1,
			msg: 'success',
			data: null
		}
	} catch (error) {
		ctx.body = 'error'
		console.log(error)
	}
})
router.post('/delete_user', async (ctx, next) => {
	const { remove } = require('./sql')
	const body = ctx.request.body
	try {
		const accountSql = `DELETE FROM user_info WHERE ID = ${body.id}`

		await remove(accountSql)

		ctx.body = {
			code: 1,
			msg: 'success',
			data: null
		}
	} catch (error) {
		ctx.body = 'error'
		console.log(error)
	}
})

module.exports = router
