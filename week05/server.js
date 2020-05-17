const http = require('http')

const server = http.createServer((req, res) => {
  console.log('Request recived!')
  // console.log(req.headers)
  res.setHeader('Content-Type', 'text/html')
  res.setHeader('X-Foo', 'bar')
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  })
  res.end('ok')
})

server.listen(8088, () => {
  console.log('Server is runing at port 8088!')
})