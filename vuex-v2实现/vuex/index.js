import { Store } from './store.js'
const store = new Store({
    state: {
        root: 1
    },
    getters: {
        rootGetter(state, getters, rootState, rootGetters) {
            return state.root
        }
    },
    mutations: {
        rootMutation(state, payload) {
            state.root = payload
        }
    },
    actions: {
        rootAction(store, payload) {
            store.commit('rootMutation', payload)
        }
    },
    modules: {
        user: {
            nameSpaced: true,
            state: {
                user: 1
            },
            getters: {
                userGetter(state, getters, rootState, rootGetters) {
                    return state.root
                }
            },
            mutations: {
                userMutation(state, payload) {
                    state.root = payload
                }
            },
            actions: {
                rootAction(store, payload) {
                    store.commit('rootMutation', payload)
                }
            }
        }
    }
})
console.log(store)
// store.commit('rootMutation', 2)
