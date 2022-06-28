module.exports = function (middleware) {
    // 判断传入的middleware是否是数组
    if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')

    // 校验数组中的每一项是否是函数
    for (const fn of middleware) {
        if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
    }

    // 返回一个拥有middleware访问的闭包
    return function (context, next) {
        let index = -1

        // 定义一个递归闭包，拥有middleware和index的访问
        const dispatch = function (i) {
            //
            if (i <= index) return Promise.reject(new Error('next() called multiple times'))

            index = i

            let fn = middleware[i]

            if (i === middleware.length) fn = next

            if (!fn) return Promise.resolve()

            try {
                return Promise.resolve(fn(context, dispatch.bind(null, i + 1)))
            } catch (err) {
                return Promise.reject(err)
            }
        }

        // 尾递归
        return dispatch(0)
    }
}
