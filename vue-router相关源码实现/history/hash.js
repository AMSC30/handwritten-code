import History from './base.js'
function getHash() {
    window.location.hash.slice(1)
}
export default class HashHistory extends History {
    getLocation() {
        return getHash()
    }
    onComplete() {
        window.addEventListener('hashchange', () => {
            this.transitionTo(this.getLocation())
        })
    }
}
