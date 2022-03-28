import { Module } from './module.js'

export default class ModuleCollection {
    constructor(rawModule) {
        this.registerModule([], rawModule)
    }
    get(path) {
        return path.reduce((module, path) => {
            return module[path]
        }, this.root)
    }
    getNameSpace(path) {
        let module = this.root
        return path.reduce((path, key) => {
            module = module.getChild(key)
            return path + (module && module.nameSpaced ? key + '/' : '')
        }, '')
    }
    registerModule(path, rawModule) {
        const module = new Module(rawModule)

        if (!path.length) {
            this.root = module
        } else {
            const parentModule = this.get(path.slice(0, path.length - 1))
            parentModule.addChild(path[path.length - 1], module)
        }
        if (rawModule.modules) {
            Object.keys(rawModule.modules).forEach(key => {
                this.registerModule(path.concat(key), rawModule.modules[key])
            })
        }
    }
}
