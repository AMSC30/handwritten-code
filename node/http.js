const getTime = () => {
  return new Date().toUTCString()
}
const http = require('http')

const server = http.createServer((req, res) => {
  const { url } = req
  if (url === '/') {
    res.end(`
          <html>
              time1:${getTime()}
              <br/>
              <script src="./main.js"></script>\
          </html>
          `)
  } else if (url === '/main.js') {
    res.setHeader('Expires', new Date(Date.now() + 10 * 1000).toUTCString())
    res.end(`document.writeln('time2:${getTime()}')`)
  } else {
    res.end()
  }
})

server.listen(3000, () => {
  console.log('server is listening in port 3000')
})
module.exports = server
