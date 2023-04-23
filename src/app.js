require("dotenv").config()
const express = require("express")
const morgan = require("morgan")

const database = require("./utils/database");
const userCont = require("./controller/users");

(async () => {
    await database.sync()
    express().use(express.json()).use(morgan())
        .post("/user",userCont.addUser)
        .put("/user/:userId", userCont.editUser)
        .delete("/user/:userId", userCont.deleteUser)
        .get("/user",userCont.getUser)
        .listen(3000, ()=>{
            console.log("SERVER Startlisting")
        })
})()