const sequelize = require("sequelize");
const joi = require("joi");

const database = require("../utils/database");

const USER_TABLE_NAME = "users";

const usersModel = database.define(USER_TABLE_NAME, {
    id: {
        type: sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: sequelize.DataTypes.STRING(25),
    },
    phone: {
        type: sequelize.DataTypes.STRING(20),
    },
    email: {
        type: sequelize.DataTypes.STRING,
    }
});


const joiUserValidator = joi.object({
    id: joi.any(),
    name: joi.string().min(4).max(15).required(),
    email: joi.string().email().required(),
    phone: joi.string().length(12),
    updatedAt:joi.any(),
    createdAt:joi.any(),
})



usersModel.beforeCreate(user => {
    console.log(` Usr is ${JSON.stringify(user)}`)
    console.log(user)
    console.log(` Usr is ${JSON.stringify(user)}`)

    const { error } = joiUserValidator.validate(user.dataValues);
    if (error) throw Error(error)
})

module.exports = {USER_TABLE_NAME, usersModel}