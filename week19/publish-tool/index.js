const http = require('http')
const querystring = require('querystring')
const fs = require('fs')
const archiver = require('archiver')

let packname = './package'
// fs.stat(packname, (err, stat) => {
  const options = {
    host: 'localhost',
    port: '3000',
    path: '/?filename=package.zip',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      // 'Content-Length': 1000
    }
  }

  const req = http.request(options, res => {
    console.log(res.statusCode)
  })

  req.on('error', e => {
    console.error(`problem with request: ${e.message}`)
  })

  const archive = archiver('zip', {
    zlib: { level: 9 }
  })

  archive.directory(packname, false);

  archive.finalize()

  archive.pipe(req)

  archive.on('end', () => {
    req.end()
  })
  
  
  // const req = http.request(options, res => {
  //   console.log(res.statusCode)
  // })

  // req.on('error', e => {
  //   console.error(`problem with request: ${e.message}`)
  // })
  
  // let readStream = fs.createReadStream(packname)
  // readStream.pipe(req)
  // readStream.on('end', () => {
  //   req.end()
  // })
  
// })

