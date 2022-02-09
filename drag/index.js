const getDom = selector => {
    return document.querySelector(selector)
}
const source = getDom('.target')
const right = getDom('.right')
source.addEventListener('dragstart', e => {
    e.target.dropEffect = 'move'
})
source.addEventListener('dragend', e => {
    e.preventDefault()
    e.stopPropagation()
    e.dataTransfer.setData('text/plain', 'drag')
    console.log(e)
})
right.addEventListener('dragenter', e => {
    const data = e.dataTransfer.getData('text/plain')
    console.log(' e.dataTransfer.getData() : ', e.dataTransfer.getData('text/plain'))
    e.target.textContent = data
})
