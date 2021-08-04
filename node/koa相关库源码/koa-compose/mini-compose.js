module.exports = function (middleware) {
	if (!middleware instanceof Array) {
		throw new TypeError('middleware must be an array!')
	}

	for (let fn of middleware) {
		if (typeof fn !== 'function') {
			throw new TypeError('middleware must be composed of functions!')
		}
	}
	return function (ctx, next) {
		let index = -1
		const dispatch = function (i) {
			if (i <= index) {
				throw new Error("next() can't be called multiple times")
			}

			index = i

			let fn = middleware[i]

			if (i === middleware.length) fn = next

			if (!fn) {
				return Promise.resolve()
			}

			try {
				return Promise.resolve(fn(ctx, dispatch.bind(null, i + 1)))
			} catch (error) {
				return Promise.reject(error)
			}
		}
		return dispatch(0)
	}
}
