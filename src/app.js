require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

const database = require("./utils/database");
const userRoutes = require("./routes/users");

(async () => {
    await database.sync()
    express().use(express.json()).use(morgan())
        .use("/user",userRoutes)
        .listen(3000, ()=>{
            console.log("SERVER Start Listing")
        })
})()