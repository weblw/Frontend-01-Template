const http = require('http')
const querystring = require('querystring')
const fs = require('fs')
const archiver = require('archiver')
const child_process = require('child_process')

let redirect_uri = encodeURIComponent(
  'http://localhost:3000/auth'
)
child_process.exec(`start https://github.com/login/oauth/authorize?client_id=Iv1.61c3525df02b4396&redirect_uri=${redirect_uri}&scope=read%3Auser&state=123abc`)

const server = http.createServer((req,res) => {
  if(!req.url.match(/^\/$/)) {
    res.writeHead(404, {'Content-Type': 'text/plain'})
    res.end('not found')
  }
  let data = req.url.match(/token=([^&]+)/)
  if(data) {
    let token = data[1]
    let packname = './package'
    fs.stat(packname, (err, stat) => {
      const options = {
        host: 'localhost',
        port: '3000',
        path: '/?filename=package.zip',
        method: 'POST',
        headers: {
          'token': token,
          'Content-Type': 'application/octet-stream',
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
      archive.directory(packname, false)
      archive.finalize()
      archive.pipe(req)
      archive.on('end', () => {
        req.end()    
      })  
    })
  } else {
    res.end('Error')
  }  
})

server.listen(5000, () => {
  console.log('server runing!')
})
