export class Module {
    constructor(rawModule) {
        this.state = rawModule.state
        this.rawModule = rawModule
        this.children = Object.create(null)
    }
    get nameSpaced() {
        return this.rawModule.nameSpaced
    }
    hasChild(key) {
        return this.children[key]
    }
    addChild(key, module) {
        this.children[key] = module
    }
    getChild(key) {
        return this.children[key]
    }
    childForeach(fn) {
        Object.keys(this.children).forEach(key => {
            fn(this.children[key], key)
        })
    }
    mutationForeach(fn) {
        this.rawModule.mutations && objForeach(this.rawModule.mutations, fn)
    }
    actionForeach(fn) {
        this.rawModule.actions && objForeach(this.rawModule.actions, fn)
    }
    actionGetters(fn) {
        this.rawModule.getter && objForeach(this.rawModule.getters, fn)
    }
}
function objForeach(obj, fn) {
    Object.keys(obj).forEach(key => {
        fn(obj[key], key)
    })
}
