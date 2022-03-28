import ModuleCollection from './module/module-collection.js'
export class Store {
    constructor(options) {
        this.actions = Object.create(null)
        this.mutations = Object.create(null)
        this.getters = Object.create(null)

        this.wrappedGetters = Object.create(null)
        this.cacheGetters = Object.create(null)

        this.modules = new ModuleCollection(options)

        const rootState = this.modules.root.state

        installModule(this, rootState, [], this.modules.root)

        resetStoreVm(this)
    }
    get state() {
        return this.vm.$$state
    }
    commit(type, payload) {
        const mutations = this.mutations[type]
        mutations.forEach(fn => {
            fn(payload)
        })
    }
    dispatch(type, payload) {
        const actions = this.actions[type]
        return Promise.all(
            actions.map(fn => {
                return fn(payload)
            })
        )
    }
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
    module.getterForeach((getter, key) => {
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
function registerMutation(store, type, handler, local) {
    const entry = store.mutations[type] || (store.mutations[type] = [])
    entry.push(payload => {
        handler.call(store, local.state, payload)
    })
}
function registerAction(store, type, handler, local) {
    const entry = store.actions[type] || (store.actions[type] = [])

    entry.push(payload => {
        return handler.call(
            store,
            {
                state: local.state,
                getter: local.getters,
                dispatch: local.dispatch,
                commit: local.commit,
                rootState: store.state,
                rootGetter: store.getters
            },
            payload
        )
    })
}
function registerGetter(store, type, handler, local) {
    store.wrappedGetters[type] = store => {
        return handler.call(store, {
            state: local.state,
            getters: local.getters,
            rootState: store.state,
            rootGetters: store.getters
        })
    }
}
function resetStoreVm(store) {
    const oldVm = store.vm
    const wrappedGetters = store.wrappedGetters
    const computed = {}
    store.getters = {}

    Object.keys(wrappedGetters).forEach(key => {
        computed[key] = () => {
            wrappedGetters[key](store)
        }
        Object.defineProperty(store.getters, key, {
            get: () => store.vm[key],
            enumerable: true
        })
    })
    store.vm = new Vue({
        data: {
            $$state: store.modules.root.state
        },
        computed
    })
    oldVm && oldVm.$destroy()
}

function makeLocal(store, nameSpace, path) {
    const noNameSpace = nameSpace === ''

    const local = {
        commit: noNameSpace
            ? store.commit.bind(store)
            : (type, payload) => {
                  const mutationName = nameSpace + type
                  store.mutation(mutationName, payload)
              },
        dispatch: noNameSpace
            ? store.dispatch.bind(store)
            : (type, payload) => {
                  const actionName = nameSpace + type
                  return store.dispatch(actionName, payload)
              }
    }
    Object.defineProperties(local, {
        state: {
            get: () => getNestedState(store.state, path)
        },
        getters: {
            get: noNameSpace ? () => store.getters : () => makeModuleGetter(store, nameSpace)
        }
    })
    return local
}
function makeModuleGetter(store, nameSpace) {
    const position = nameSpace.length
    const gettersProxy = {}

    Object.keys(store.getters).forEach(key => {
        if (!key.slice(0, position) === nameSpace) return

        const localType = key.slice(position)

        Object.defineProperty(gettersProxy, localType, {
            get: () => store.getters[type],
            enumerable: true
        })
    })

    store.cacheGetters[nameSpace] = gettersProxy

    return store.cacheGetters[nameSpace]
}
