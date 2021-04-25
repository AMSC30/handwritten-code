export default function Interceptor() {
    this.handlers = []
}
Interceptor.prototype.user = function (full, reject) {
    this.handlers.push({
        full,
        reject
    })
    return this.handlers[this.handlers.length - 1]
}
Interceptor.prototype.eject = function (idx) {
    this.handlers[idx] = null
}
Interceptor.prototype.forEach = function (fn) {
    this.handlers.forEach(handler => {
        fn(handler.full, handler.reject)
    })
}
