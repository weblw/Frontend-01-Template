const http = require('http')
const fs = require('fs')
const unzip = require('unzipper')

const server = http.createServer((req,res) => {
  let matched = req.url.match(/filename=([^&]+)/)
  let filename = (matched && matched[1])
  console.log(filename)
  if(!filename) return

  let writeStream = unzip.Extract({
    path: '../server/public'
  })

  // let writeStream = fs.createWriteStream('../server/public/' + filename)

  // console.log(writeStream)

  req.pipe(writeStream)

  // req.on('data', chunk => {
  //   console.log(chunk)
  //   writeStream.write(chunk)
  // })
  // req.on('end', chunk => {
  //   writeStream.end(chunk)
  // })
  req.on('end', () => {
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.end('OK')
  }) 
})

server.listen(3000, () => {
  console.log('server runing!')
})