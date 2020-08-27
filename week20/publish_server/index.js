const http = require('http')
const fs = require('fs')
const unzip = require('unzipper')
const https = require('https')

const server = http.createServer((req,res) => {
  if(req.url.match(/^\/auth/)) {
    return auth(req, res)
  }
  if(!req.url.match(/^\/$/)) {
    res.writeHead(404, {'Content-Type': 'text/plain'})
    res.end('not found')
  }

  const options = {
    hostname: 'api.github.com',
    port: 443,
    path: `/user`,
    method: 'GET',
    headers: {
      Authorization: 'token ' + req.headers.token,
      "User-Agent": 'publish-tool'
    }
  }

  const request = https.request(options,  response => {
    let body = ''
    response.on('data', data => {
      body += data.toString()
    })
    response.on('end', () => {      
      let user = JSON.parse(body) 
      let matched = req.url.match(/filename=([^&]+)/)
      let filename = (matched && matched[1])
      console.log(filename)
      if(!filename) return
      let writeStream = unzip.Extract({
        path: '../server/public'
      })
      req.pipe(writeStream)
    })
  })
  request.on('error', err => {
    console.log(err)
  })
  request.end()
  req.on('end', () => {
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.end('OK')
  }) 
})

server.listen(3000, () => {
  console.log('server runing!')
})

function auth(req, res) {
  let code = req.url.match(/code=([^&]+)/)[1]
  let client_id = 'Iv1.61c3525df02b4396'
  let client_secret = '11a3b06c4fd29fc56ee3ae022144f14a8c1391ff'
  let redirect_uri = encodeURIComponent(
    'http://localhost:3000/auth'
  )
  let state = '123abc'
  let params = `code=${code}&state=${state}&client_secret=${client_secret}&client_id=${client_id}&redirect_uri=${redirect_uri}`
  let url = `https://github.com/login/oauth/access_token?${params}`

  const options = {
    hostname: 'github.com',
    port: 443,
    path: `/login/oauth/access_token?${params}`,
    method: 'POST'
  }

  const request = https.request(options,  response => {
    response.on('data', data => {
      let result = data.toString().match(/access_token=([^&]+)/)
      if(result) {
        let token = result[1]
        res.writeHead(200, {
          'access_token': token,
          'Content-Type': 'text/html'
        })
        res.end(`<a href="http://localhost:5000/publish?token=${token}">publish</a>`)
      } else {
        res.end('Error')
      }      
    })
  })
  request.on('error', err => {
    console.log(err)
  })
  request.end()
}