const input = document.querySelector('#file')
const img = document.querySelector('#img')
const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

const init = () => {
	input.addEventListener('change', e => {
		const file = e.target.files[0]
		fileToObjectURL(file)
	})
}

// 文件转换为dataURL
const fileToDataURL = file => {
	const reader = new FileReader()
	reader.readAsDataURL(file)
	reader.onload = e => {
		img.setAttribute('src', e.target.result)
	}
}

// 文件转换为对象url
const fileToObjectURL = file => {
	const url = URL.createObjectURL(file)
	img.setAttribute('src', url)
	img.onload = () => {
		URL.revokeObjectURL(url)
		imgToCanvas()
		console.log(canvasToDataURL())
	}
}

// 文件转换为buffer
const fileToArrayBuffer = file => {
	const reader = new FileReader()
	reader.readAsArrayBuffer(file)
	reader.onload = () => {
		console.log(reader.result)
	}
}

// img画在canvas上
const imgToCanvas = () => {
	ctx.drawImage(img, 0, 0)
}

// 通过canvas获取dataURL
const canvasToDataURL = () => {
	return canvas.toDataURL('image/png', 1.0)
}

// 通过canvas获取blob
const canvasToBlob = () => {
	canvas.toBlob(result => {
		console.log(result)
	})
}

// 获取blob
const getBlobFromLocalImg = async () => {
	const res = await fetch('./logo.png')
	const result = await res.blob()
	console.log(result)
}

getBlobFromLocalImg()
// init()
