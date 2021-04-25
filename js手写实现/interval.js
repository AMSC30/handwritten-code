function myInterval(fn, time) {
    const timer = {
        run: true
    }

    function run() {
        if (timer && timer.run) {
            setTimeout(() => {
                run()
                fn()
            }, time)
        }
    }
    run()
    return timer
}
let se = 1

let timer = myInterval(() => {
    console.log(se++)
}, 1000)
setTimeout(() => {
    timer.run = false
}, 5000)
