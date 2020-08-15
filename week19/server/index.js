const express = require('express')
const app = express()
const port = 8088

app.get('/', (req, res) => {
  res.send('hello word!')
})

app.listen(port, () => {
  console.log('server is run!')
})