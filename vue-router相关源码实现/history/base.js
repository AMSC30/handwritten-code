export default class History {
    constructor(router) {
        this.router = router
    }
    transitionTo(location, callback) {
        this.router.match(location)

        callback && callback()
    }
}
