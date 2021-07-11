function compose(middleWares) {
	return function () {
		function dispatch(i) {
			const fn = middleWares[i]

			if (!fn) return Promise.resolve()

			return fn(() => {
				return dispatch(++i)
			})
		}

		return dispatch(0)
	}
}
