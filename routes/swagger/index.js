const express = require('express')

const swagger = express()
// https://www.npmjs.com/package/swagger-ui-express
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')

swagger.use(
  '/',
  function (req, _res, next) {
    req.swaggerDoc = YAML.load('./swagger.yaml')
    next()
  },
  swaggerUi.serve,
  swaggerUi.setup()
)

module.exports = swagger
