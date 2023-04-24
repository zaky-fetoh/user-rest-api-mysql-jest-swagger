require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const waitport = require("wait-port");
const https = require("https");
const fs = require("fs");
const cors = require('cors');


const database = require("./utils/database");
const userRoutes = require("./routes/users");
const monitor = require("./utils/metrics");


const cred = {
    key: fs.readFileSync("./key.pem", 'utf-8'),
    cert: fs.readFileSync("./cert.pem", 'utf-8'),
};

(async () => {
    await waitport({
        host: process.env.DB_HOST,
        port: 3306,
    })
    await database.sync()

    const app = express().use(cors())
    .use(monitor.monitorResponseTime)
    .use(express.json()).use(morgan())
    .use("/user", userRoutes)

    https.createServer(cred,app
    ).listen(3000, () => {
        console.log("SERVER Start Listing")
    })
    monitor.StartMentoringServer()
})()