const express     = require('express')
const serveStatic = require('serve-static')
const path        = require('path')


const app = express()
app.use('/', serveStatic(path.join(__dirname,'/dist')))
app.use(function(req, res) {
    res.send(404, 'Page not found');
});

const port =  process.env.PORT || 8080
app.listen(port)