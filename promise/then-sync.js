const myPromise1 = new MyPromise((resolve, reject) => {
    reject('hello')
})
myPromise1
    .then(
        res => {
            console.log(res)
            return '2'
        },
        rej => {
            console.log(rej)
            throw new Error('3')
        }
    )
    .then(
        res => {
            console.log(res)
        },
        rej => {
            console.log(rej)
        }
    )
