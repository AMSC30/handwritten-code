import ModuleCollection from './module/module-collection.js'
export class Store {
    constructor(options) {
        this.actions = Object.create(null)
        this.mutations = Object.create(null)
        this.getters = Object.create(null)

        this.wrappedGetters = Object.create(null)

        this.subscribes = Object.create(null)
        this.subscribeActions = Object.create(null)

        this.modules = new ModuleCollection(options)

        const rootState = this.modules.root.state

        installModule(this, rootState, [], this.modules.root)

        resetStoreVm(this)
    }
    commit() {}
    dispatch() {}
    subscribe() {}
    subscribeAction() {}
}
function installModule(store, rootState, path, module) {
    const isRoot = !path.length
    const nameSpace = store.modules.getNameSpace(path)

    // 处理state
    if (!isRoot) {
        const parentState = getNestedState(rootState, path.slice(0, -1))
        const moduleName = path[path.length - 1]
        Vue.set(parentState, moduleName, module.state)
    }

    // 生成local
    const local = (module.context = makeLocal(store, nameSpace, path))

    // 处理mutation
    module.mutationForeach((mutation, key) => {
        const newSpace = nameSpace + key
        registerMutation(store, newSpace, mutation, local)
    })
    // 处理action
    module.actionForeach((action, key) => {
        const newSpace = nameSpace + key
        registerAction(store, newSpace, action, local)
    })
    // 处理getter
    module.actionGetters((getter, key) => {
        const newSpace = nameSpace + key
        registerGetter(store, newSpace, getter, local)
    })
    // 递归安装
    module.childForeach((module, key) => {
        installModule(store, rootState, path.concat(key), module)
    })
}

function getNestedState(state, path) {
    return path.reduce((state, key) => {
        return state[key]
    }, state)
}
function registerMutation() {}
function registerAction() {}
function registerGetter() {}
function resetStoreVm() {}

function makeLocal() {}
