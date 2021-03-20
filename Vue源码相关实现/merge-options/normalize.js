export const props = function (options) {
    const props = options.props || {}
    const res = {}
    if (Array.isArray(props)) {
        let len = props
        while (len--) {
            let key = props[len]
            if (typeof key === 'string') {
                res[key] = { type: null }
            }
        }
    } else if (typeof props === 'object') {
        for (let key in props) {
            let val = props[key]
            res[key] = typeof val === 'object' ? val : { type: val }
        }
    }
    options.props = res
}
export const inject = function (options) {
    const inject = options.inject || {}
    const res = {}
    if (Array.isArray(inject)) {
        let i = inject.length
        while (i--) {
            let key = inject[i]
            res[key] = { from: key }
        }
    } else if (typeof inject === 'object') {
        for (let key in inject) {
            res[key] = typeof inject === 'object' ? inject[key] : { from: inject[key] }
        }
    }
    options.inject = res
}
export const directives = function (options) {
    const directives = options.directives
    for (let key in directives) {
        directives[key] =
            typeof directives[key] === 'function'
                ? { bind: directives[key], update: directives[key] }
                : directives[key]
    }
}
