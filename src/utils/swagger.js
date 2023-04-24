const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const express = require("express")

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "User API",
            version: "1.0.0",
            description: "A simple User API",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ["../routes/*.js"],
};


module.exports = express.Router()
    .use("/api-docs", swaggerUI.serve, swaggerUI.setup(
        swaggerJsDoc(options)
    ));

