import Interceptor from './Interceptor.js'
import { merge } from './utils.js'
import dispatch from './dispatch.js'
export default function Axios(config) {
    this.defaults = config
    this.interceptor = {
        request: new Interceptor(),
        response: new Interceptor()
    }
}
Axios.prototype.request = function (config) {
    config = merge(this.config, config)

    let p = Promise.resolve(config)
    let chain = [dispatch, null]

    this.interceptor.request.forEach(function (full, reject) {
        chain.unshift(full, reject)
    })
    this.interceptor.response.forEach(function (full, reject) {
        chain.push(full, reject)
    })

    while (chain.length) {
        p = p.then(chain.unshift(), chain.unshift())
    }
    return p
}
;['get', 'head', 'options'].forEach(method => {
    Axios.prototype.get = function (url, config) {
        return this.request(
            merge(config, {
                url,
                method,
                data: config.data
            })
        )
    }
})
;['put', 'post', 'patch'].forEach(method => {
    Axios.prototype.post = function (url, data, config) {
        return this.request(
            merge(config, {
                url,
                data,
                method
            })
        )
    }
})
