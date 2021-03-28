import install from './install.js'
import createMatcher from './create-matcher.js'
import HashHistory from './history/hash.js'
export default class VueRouter {
    constructor(options) {
        // 创建matcher
        this.matcher = createMatcher(options.routes || [])
        // 创建路由系统
        this.mode = options.mode || 'hash'

        this.history = new HashHistory(this)
    }
    init() {
        const history = this.history
        history.transitionsTo(history.getLocation(), history.onComplete)
    }
    match(location) {
        this.matcher.match(location)
    }
}
VueRouter.install = install
const options = {
    routes: [
        { path: '/', component: 'root' },
        {
            path: '/home',
            component: 'home',
            children: [
                {
                    path: 'user',
                    component: 'user',
                    children: [
                        {
                            path: 'score',
                            component: 'score'
                        }
                    ]
                }
            ]
        }
    ]
}
console.log(new VueRouter(options))
