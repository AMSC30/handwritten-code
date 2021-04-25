import Axios from './core/Axios.js'
import { merge } from './core/utils.js'

function createInstance(config) {
    let axios = new Axios(config)
    let instance = Axios.prototype.request.bind(axios)

    for (let key in Axios.prototype) {
        instance[key] = Axios.prototype[key].bind(axios)
    }

    instance.defaults = axios.defaults
    instance.interceptor = axios.interceptor

    return instance
}

let defaultConfig = {
    method: 'get'
}

let axios = createInstance(defaultConfig)

axios.Axios = Axios

axios.create = function (config) {
    return createInstance(merge(axios.defaultConfig, config))
}

export default axios
