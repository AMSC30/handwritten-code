export default function (Vue) {
    Vue.mixin = function (options) {
        this.options = merge(this.options, options)
        return this
    }
}

function merge() {}
