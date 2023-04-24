const swaggerUI = require("swagger-ui-express");
const express = require("express")
const ymljs = require("yamljs")

const options = ymljs.load("./src/docs.yml")

module.exports = express.Router()
    .use(swaggerUI.serve, swaggerUI.setup(options));

