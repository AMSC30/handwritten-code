const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class Promise {
	constructor(executor) {
		this.value = null
		this.status = PENDING
		this.fulfilledCallbacks = []
		this.rejectedCallbacks = []

		try {
			executor(this.resolve.bind(this), this.reject.bind(this))
		} catch (error) {
			this.reject(error)
		}
	}
	resolve(value) {
		if (this.status === PENDING) {
			this.value = value
			this.status = FULFILLED
			this.fulfilledCallbacks.forEach(fn => {
				fn(value)
			})
		}
	}
	reject(reason) {
		if (this.status === PENDING) {
			this.status = REJECTED
			this.reason = reason
			this.rejectedCallbacks.forEach(fn => fn(reason))
		}
	}
	then(fulfilled, rejected) {
		// 处理回调函数
		fulfilled = isFn(fulfilled) ? fulfilled : fulfilled => fulfilled
		rejected = isFn(rejected) ? rejected : rejected => rejected
	}
	catch() {}
	static all(list) {}
	static race(list) {}
}
const isFn = fn => typeof fn === 'function'
