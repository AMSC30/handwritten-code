const mysql = require('mysql')

const config = {
	host: 'localhost',
	user: 'root',
	password: '123456',
	database: 'zhengxixuan'
}

const connection = mysql.createConnection(config)

module.exports = {
	query(sql) {
		return new Promise((resolve, reject) => {
			connection.query(sql, (error, result) => {
				if (error) reject(error)

				resolve(result)
			})
		})
	},
	insert(sql, params) {
		return new Promise((resolve, reject) => {
			connection.query(sql, params, (error, result) => {
				if (error) reject(error)

				resolve(result)
			})
		})
	},
	update(sql, params) {
		return new Promise((resolve, reject) => {
			connection.query(sql, params, (error, result) => {
				if (error) reject(error)

				resolve(result)
			})
		})
	},
	remove(sql) {
		return new Promise((resolve, reject) => {
			connection.query(sql, (error, result) => {
				if (error) reject(error)

				resolve(result)
			})
		})
	}
}
