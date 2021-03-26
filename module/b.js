const dailyTemperatures = arr => {
    if (arr.length === 0) return []
    if (arr.length === 1) return [0]
    let result = []
    arr.forEach((tem, index) => {
        let inner = index + 1

        while (inner) {
            if (arr[inner] > tem) {
                result.push(inner - index)
                return
            }
            inner++
        }
        result.push(0)
    })
    return result
}
console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]))
