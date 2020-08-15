var express = require('express');
var router = express.Router();
var fs = require('fs')


/* GET home page. */
router.post('/', function(req, res, next) {
  req.on('data', data => {
    console.log(data)
  })
  console.log(req.body.content)
  fs.writeFileSync(`../server/public/${req.query.filename}`, req.body.content)
  res.end('');
});

module.exports = router;
