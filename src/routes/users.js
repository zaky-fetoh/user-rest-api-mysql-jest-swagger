const express = require("express");

const userCont = require("../controller/users");


module.exports = express.Router()
    .get("/", userCont.getUser)
    .post("/", userCont.addUser)
    .put("/:userId", userCont.editUser)
    .delete("/:userId", userCont.deleteUser)