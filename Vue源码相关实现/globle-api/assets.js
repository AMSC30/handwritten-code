const assets = ['component', 'filter', 'directive']
export default function (Vue) {
    assets.forEach(type => {
        Vue[type] = function (id, descriptor) {
            if (!descriptor) {
                return this.options[type + 's'][id]
            }
            if (type === 'component' && typeof descriptor == 'object') {
                descriptor.name = descriptor.name || id
                descriptor = function () {
                    return descriptor
                }
            }
            if (type == 'directive' && typeof descriptor === 'function') {
                descriptor = { bind: descriptor, update: descriptor }
            }
            this.options[type + ''][id] = descriptor
            return this
        }
    })
}
