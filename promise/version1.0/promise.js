// 定义promise对象的三种状态
const FULFILLED = 'fulfilled'
const PENDING = 'pending'
const REJECTED = 'rejected'

function resolvePromise(promise2, x, resolve, reject) {
	// 循环引用报错
	if (x === promise2) {
		// reject报错
		return reject(new TypeError('Chaining cycle detected for promise'))
	}
	// 防止多次调用
	let called
	// x不是null 且x是对象或者函数
	if (x != null && (typeof x === 'object' || typeof x === 'function')) {
		try {
			// A+规定，声明then = x的then方法
			let then = x.then
			// 如果then是函数，就默认是promise了
			if (typeof then === 'function') {
				// 就让then执行 第一个参数是this   后面是成功的回调 和 失败的回调
				then.call(
					x,
					y => {
						// 成功和失败只能调用一个
						if (called) return
						called = true
						// resolve的结果依旧是promise 那就继续解析
						resolvePromise(promise2, y, resolve, reject)
					},
					err => {
						// 成功和失败只能调用一个
						if (called) return
						called = true
						reject(err) // 失败了就失败了
					}
				)
			} else {
				resolve(x) // 直接成功即可
			}
		} catch (e) {
			// 也属于失败
			if (called) return
			called = true
			// 取then出错了那就不要在继续执行了
			reject(e)
		}
	} else {
		resolve(x)
	}
}

// 创建promise构造类
class MyPromise {
	constructor(executor) {
		this.resolveCallbacks = []
		this.rejectCallbacks = []

		// 初始化
		this.status = PENDING
		this.value = undefined
		this.reason = undefined

		// 状态修改函数
		this.resolve = value => {
			if (this.status === PENDING) {
				this.value = value
				this.status = FULFILLED
				this.resolveCallbacks.forEach(fn => {
					fn(this.value)
				})
			}
		}
		this.reject = reason => {
			if (this.status === PENDING) {
				this.reason = reason
				this.status = REJECTED
				this.rejectCallbacks.forEach(fn => {
					fn(this.reason)
				})
			}
		}

		try {
			executor(this.resolve, this.reject)
		} catch (error) {
			this.reject(error)
		}
	}

	then(onFulfilled, onRejected) {
		// then方法没有提供回调方法时初始化一下
		onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
		onRejected =
			typeof onRejected === 'function'
				? onRejected
				: reason => {
						throw reason
				  }

		//   重新实例化一个promise对象
		const promise = new Promise((resolve, reject) => {
			// 对象为FULFILLED状态时，调用传入的onFulfilled方法，并根据返回值来确定promise对象的状态，如果抛出错误，直接将状态置为FULFILLED
			if (this.status === FULFILLED) {
				setTimeout(() => {
					try {
						let result = onFulfilled(this.value)
						resolvePromise(promise, result, resolve, reject)
					} catch (error) {
						reject(error)
					}
				}, 0)
			}

			// 对象状态为REJECTED状态时，调用传入的onRejected方法，并根据返回值来确定promise的状态，如果这个方法抛出错误，直接置为REJECTED
			if (this.status === REJECTED) {
				setTimeout(() => {
					try {
						let result = onRejected(this.reason)
						resolvePromise(promise, result, resolve, reject)
					} catch (error) {
						reject(error)
					}
				}, 0)
			}

			// 如果状态为pending状态时，将回调方法放到上一个promise对象的回调栈中，因为不确定上一个promise的最终状态为什么，所以将onResolve,onReject都放在上一个promise对象的成功和失败回调栈中
			if (this.status === PENDING) {
				this.resolveCallbacks.push(() => {
					setTimeout(() => {
						try {
							let result = onFulfilled(this.value)
							resolvePromise(promise, result, resolve, reject)
						} catch (error) {
							reject(error)
						}
					}, 0)
				})

				this.rejectCallbacks.push(() => {
					setTimeout(() => {
						try {
							let result = onRejected(this.value)
							resolvePromise(promise, result, resolve, reject)
						} catch (error) {
							reject(error)
						}
					}, 0)
				})
			}
		})
		return promise
	}
}
export default MyPromise
