const container = document.querySelector('.container')
const wrapper = document.querySelector('.wrapper')
let current = 1
let timer = null

function start() {
    timer && (timer = null)

    timer = setInterval(() => {
        scroll()
    }, 1500)
}
function scroll() {
    if (current == 6) {
        current = 0
    }
    wrapper.style.transform = `translateX(${-800 * current++}px)`
}
start()
