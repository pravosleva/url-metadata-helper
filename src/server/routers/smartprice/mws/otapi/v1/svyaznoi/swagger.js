const express = require('express')
const path = require('path')

const swagger = express()
// https://www.npmjs.com/package/swagger-ui-express
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')

// const doc = YAML.load(path.join(__dirname, 'swagger.yaml'))
// const EXTERNAL_ROUTING = process.env.EXTERNAL_ROUTING || ''

// NOTE: See also themes for swagger 3.x: https://github.com/ostranme/swagger-ui-themes/blob/develop/themes/3.x/theme-material.css
const options = {
  // customCssUrl: `${EXTERNAL_ROUTING}/assets/swagger-ui/css/theme-material.modified.sp.css`,
  // customJs: `${EXTERNAL_ROUTING}/assets/swagger-ui/js/onload.js`,
}

swagger.use(
  '/',
  function (req, _res, next) {
    // From root dir:
    req.swaggerDoc = YAML.load(path.join(__dirname, './swagger.yaml'))
    next()
  },
  // swaggerUi.serveFiles(doc, {}),
  // function (req, res, next) {
  //   doc.host = 'http://localhost:5000/swagger/' // req.get('host')
  //   req.swaggerDoc = doc
  //   next()
  // },
  swaggerUi.serve,
  swaggerUi.setup(null, options)
)

module.exports = swagger
