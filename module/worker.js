self.onmessage = function (data) {
    console.log(this)
    data = data.data
    let result = ((data.size / 1024 / 1024) * 1).toFixed(2) + 'M'
    self.postMessage(result)
}
