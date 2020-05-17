const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
  let data = fs.readFileSync('./index.html', 'utf-8')
  console.log('request recived')
  res.writeHead(200, {
    'Content-Type': 'text/html'
  })
  res.end(data)
})

server.listen(8088, () => {
  console.log('server is runing at port 8088!')
})