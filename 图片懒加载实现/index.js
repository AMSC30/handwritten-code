let content = document.querySelector('.content')
let clientHeight = content.clientHeight
let loadDistance = 10

let loadImage = function () {
    let scrollTop = content.scrollTop
    let images = content.getElementsByTagName('img')
    for (let i = 0; i < images.length; i++) {
        let image = images[i]

        let offsetTop = image.offsetTop
        let distance = offsetTop - clientHeight - scrollTop
        if (image.dataset.src && distance <= loadDistance) {
            image.src = image.dataset.src
        }
    }
}

let timer = null
let handler = function () {
    if (timer) {
        clearTimeout(timer)
    }
    timer = setTimeout(loadImage, 500)
}
window.onload = handler
content.addEventListener('scroll', handler)
