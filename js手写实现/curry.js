const origin = function (a, b, c) {
	return a * b * c
}
const curry = function (fn) {
	if (typeof fn !== 'function') {
		throw new TypeError('argument need type of function')
	}

	const args = []

	const result = function () {
		args.push(...Array.prototype.slice.apply(arguments))

		if (args.length >= fn.length) {
			return fn.apply(this, args)
		} else {
			return result
		}
	}

	return result
}
const curriedOrigin = curry(origin)

console.log(curriedOrigin(3, 2)(2))
