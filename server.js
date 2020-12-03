const express     = require('express')
const serveStatic = require('serve-static')
const path        = require('path')


const app = express()
app.use(express.static(__dirname + '/dist'));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '/dist/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  })
const port =  process.env.PORT || 8080
app.listen(port)