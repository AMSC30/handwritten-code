class MyPromise {
  static pending = 0
  static fulfilled = 1
  static rejected = 2

  state = MyPromise.pending
  value = null
  fulfilledCallbacks = []
  rejectedCallbacks = []

  constructor(executor) {
    if (!this instanceof MyPromise) {
      throw new Error('promise need call with new...')
    }

    if (!executor || typeof executor !== 'function') {
      throw new Error('constructor MyPromise need a function executor and it is required')
    }

    try {
      executor(this.resolve.bind(this), this.reject.bind(this))
    } catch (e) {
      this.reject(e)
    }
  }
  resolve(value) {
    if (this.state === MyPromise.pending) {
      this.state = MyPromise.fulfilled
      this.value = value
      if (this.fulfilledCallbacks.length) {
        this.fulfilledCallbacks.forEach(fn => {
          fn(this.value)
        })
      }
    }
  }
  reject(reason) {
    if (this.state === MyPromise.pending) {
      if (!(reason instanceof Error)) {
        throw new TypeError('reject reason need typeof error')
      }
      this.state = MyPromise.rejected
      this.value = reason
      if (this.rejectedCallbacks.length) {
        this.rejectedCallbacks.forEach(fn => fn(this.reason))
      }
    }
  }
  then(onFulFilled, onRejected) {
    if (typeof onFulFilled !== 'function') {
      onFulFilled = value => value
    }
    if (typeof onRejected !== 'function') {
      onRejected = error => {
        throw error
      }
    }
    const p1 = new MyPromise((resolve, reject) => {
      const resolveHandler = () => {
        try {
          const value = onFulFilled(this.value)
          this.resolvePromise(p1, value, resolve, reject)
        } catch (error) {
          reject(error)
        }
      }
      const rejectHandler = () => {
        try {
          const value = onRejected(this.value)
          this.resolvePromise(p1, value, resolve, reject)
        } catch (error) {
          reject(error)
        }
      }
      if (this.state === MyPromise.fulfilled) {
        setTimeout(resolveHandler, 0)
      }
      if (this.state === MyPromise.rejected) {
        setTimeout(rejectHandler, 0)
      }
      if (this.state === MyPromise.pending) {
        this.fulfilledCallbacks.push(() => {
          setTimeout(resolveHandler, 0)
        })

        this.rejectedCallbacks.push(() => {
          setTimeout(rejectHandler, 0)
        })
      }
    })
    return p1
  }
  catch(onRejected) {
    return this.then(null, onRejected)
  }
  finally(finalFn) {
    return this.then(finalFn, finalFn)
  }
  static resolve(val) {
    if (val instanceof MyPromise) return val
    return new MyPromise(resolve => {
      resolve(val)
    })
  }
  static reject(error) {
    if (error instanceof MyPromise) return error
    return new MyPromise((resolve, reject) => {
      reject(error)
    })
  }
  static all(promiseList) {
    return new MyPromise((resolve, reject) => {
      if (Array.isArray(promiseList)) {
        if (!promiseList.length) {
          return resolve(promiseList)
        }
        let count = 0
        const result = []
        const complete = () => {
          count === promiseList.length && resolve(result)
        }
        promiseList.forEach((item, index) => {
          if (!(item instanceof MyPromise)) {
            count++
            result.push(item)
            complete()
          } else {
            item.then(
              value => {
                count++
                result.push(value)
                complete()
              },
              error => {
                reject(error)
              }
            )
          }
        })
      } else {
        reject(new Error('argument is not iterable'))
      }
    })
  }
  static allSettled(promiseList) {
    if (Array.isArray(promiseList)) {
      return new MyPromise((resolve, reject) => {
        if (!promiseList.length) {
          return resolve(promiseList)
        }
        const result = []
        let count = 0

        const complete = () => {
          count === promiseList.length && resolve(result)
        }

        promiseList.forEach((item, index) => {
          count++
          if (item instanceof MyPromise) {
            item
              .then(val => {
                result.push({ status: 'fulfilled', value: val })
                complete()
              })
              .catch(e => {
                result.push({ status: 'rejected', reason: e })
                complete()
              })
          } else {
            result.push({ status: 'fulfilled', value: item })
            complete()
          }
        })
      })
    } else {
      return reject(new Error('argument is not iterable'))
    }
  }
  static race(promiseList) {
    return new myPromise((resolve, reject) => {
      if (Array.isArray(promises)) {
        if (promises.length > 0) {
          promises.forEach(item => {
            myPromise.resolve(item).then(resolve, reject)
          })
        }
      } else {
        return reject(new TypeError('Argument is not iterable'))
      }
    })
  }
  resolvePromise(promise, value, resolve, reject) {
    // 1.如果返回了相同的promise
    if (promise === value) {
      return reject(new Error('The promise and the return value are the same'))
    }
    // 2.如果返回的是promise
    if (value instanceof MyPromise) {
      return value.then(
        val => {
          this.resolvePromise(promise, val, resolve, reject)
        },
        error => {
          reject(error)
        }
      )
    }

    // 3. 如果返回的是对象，根据是否具有then方法做不同的处理
    if (typeof value === 'object' || typeof value === 'function') {
      if (value === null) return resolve(value)

      const then = value.then
      if (typeof then === 'function') {
        try {
          then.call(
            value,
            val => {
              this.resolvePromise(promise, val, resolve, reject)
            },
            error => {
              reject(error)
            }
          )
        } catch (error) {
          reject(error)
        }
      } else {
        resolve(value)
      }
    } else {
      resolve(value)
    }
  }
}

// module.exports = MyPromise
