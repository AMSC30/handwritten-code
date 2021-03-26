import { getElement } from './module.js'

const worker = new Worker('./worker.js')

const dom = getElement('#file')
dom.onchange = function () {
    worker.postMessage(this.files[0])
}
worker.onmessage = data => {
    data = data.data
    console.log(data)
}
