const fsevents = require('fsevents')
const { exec } = require('child_process')

exex('http-server')

const stop = fsevents.watch(__dirname, (path, flags, id) => {
  const info = fsevents.getInfo(path, flags, id)
  console.log('webpack')
  exec('webpack')
})