import { install } from 'source-map-support'

import install from './install'
import createWatcher from './create-matcher'
export default class VueRouter {
    constructor(options) {
        this.matcher = createWatcher(options.routes)
    }
    init() {}
}
VueRouter.install = install
