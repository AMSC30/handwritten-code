import { mixin } from 'lodash'

export default function mergeOptions(parent, child, vm) {
    // 将extend进行合并
    if (child.extend) {
        parent = mergeOptions(parent, child.extend, vm)
    }
    // 将mixin合并
    if (child.mixins) {
        child.mixins.forEach(mixin => {
            parent = mergeOptions(parent, mixin, vm)
        })
    }
    const options
    for (const key in parent) {
        merge(key)
    }
    for (const key in child) {
        if (!parent.hasOwnProperty(key)) {
            merge(key)
        }
    }

    function merge(key) {
        let strategy = function (parentVal, childVal) {
            if (!childVal) return parentVal
            return result
        }
        options[key] = strategy(parent[key], child[key])
    }
    return options
}
