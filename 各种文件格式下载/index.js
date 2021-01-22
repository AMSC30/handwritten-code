const text = document.querySelector('#text')
const json = document.querySelector('#json')
const textBtn = document.querySelector('#textbtn')
const jsonBtn = document.querySelector('#jsonbtn')
const table = document.querySelector('#table')
const tableBtn = document.querySelector('#tablebtn')
const wordBtn = document.querySelector('#wordBtn')
const canvas = document.querySelector('#canvas')

const downloadByContent = (content, name, type) => {
    const valueBlob = new Blob([content], { type })
    const url = URL.createObjectURL(valueBlob)
    downloadByUrl(url, name)
}

const downloadByUrl = (url, name) => {
    const a = document.createElement('a')
    a.href = url
    a.download = name
    a.click()
}

const downloadByDataURL = (content, filename, type) => {
    const dataUrl = `data:${type};base64,${window.btoa(unescape(encodeURIComponent(content)))}`
    downloadByUrl(dataUrl, filename)
}

textBtn.onclick = () => {
    const value = text.value
    const name = '文本示例下载'
    const type = 'text/plain'
    downloadByContent(value, name, type)
}

jsonBtn.onclick = () => {
    const value = json.value
    const name = 'json示例下载'
    const type = 'application/json'
    downloadByContent(value, name, type)
}

tableBtn.onclick = () => {
    const template =
        '<html xmlns:o="urn:schemas-microsoft-com:office:office" ' +
        'xmlns:x="urn:schemas-microsoft-com:office:excel" ' +
        'xmlns="http://www.w3.org/TR/REC-html40">' +
        '<head>' +
        '</head>' +
        '<body><table border="1" style="width:60%; text-align: center;">{table}</table></body>' +
        '</html>'
    const context = template.replace('{table}', table.innerHTML)
    downloadByContent(context, 'table.xls', 'application/vnd.ms-excel')
}

wordBtn.onclick = () => {
    const value = document.body.innerHTML
    const type = 'application/msword'
    const name = 'word-test'
    const template =
        '<html xmlns:o="urn:schemas-microsoft-com:office:office" ' +
        'xmlns:x="urn:schemas-microsoft-com:office:word" ' +
        'xmlns="http://www.w3.org/TR/REC-html40">' +
        '<head>' +
        '</head>' +
        '<body>{body}</body>' +
        '</html>'
    const content = template.replace('{body}', value)
    downloadByContent(content, name, type)
}
function base64ToBlob(base64, type) {
    const byteCharacters = atob(base64)
    const byteNumbers = new Array(byteCharacters.length)
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i)
    }
    const buffer = Uint8Array.from(byteNumbers)
    const blob = new Blob([buffer], { type })
    return blob
}
