const express = require('express')
const path = require('path')

const swagger = express()
// https://www.npmjs.com/package/swagger-ui-express
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')

// const doc = YAML.load(path.join(__dirname, 'swagger.yaml'))
// const options = {
//   customCssUrl: '/swagger/swagger-ui.css',
//   customJs: '/swagger/swagger-ui-init.js',
// }

swagger.use(
  '/',
  function (req, _res, next) {
    // From root dir:
    req.swaggerDoc = YAML.load(path.join(__dirname, 'swagger.yaml'))
    next()
  },
  // swaggerUi.serveFiles(doc, {}),
  // function (req, res, next) {
  //   doc.host = 'http://localhost:5000/swagger/' // req.get('host')
  //   req.swaggerDoc = doc
  //   next()
  // },
  swaggerUi.serve,
  swaggerUi.setup()
)

module.exports = swagger
