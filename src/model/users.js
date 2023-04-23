const sequelize = require("sequelize");
const joi = require("joi");

const database = require("../utils/database");

const USER_TABLE_NAME  = "users";

const userModel = database.define(USER_TABLE_NAME,{
    id:{
        type:sequelize.DataTypes.INTEGER,
        autoIncrement: true, 
        allowNull: false, 
        primaryKey: true,
    },
    name:{
        type:sequelize.DataTypes.STRING, 
        allowNull:false, 
    },
    phone:{
        type: sequelize.DataTypes.STRING,
    },
    email:{
        type:sequelize.DataTypes.STRING,
    }
});


const joiValidator = joi.object({
    
})
