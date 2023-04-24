const { usersModel } = require("../model/users")

const NUMBER_PER_PAGE = Number(process.env.NUMBER_PER_PAGE)


exports.addUser = async (req, res, next) => {
    /***
     * URL: /user  
     * Method: POST
     * input: POST body JSON File according user schema
     * It addes a user object to tthe database 
     */
    try {
        const user = req.body
        const userObjSavedtoDB = await usersModel.create(user);
        res.status(200).json({
            ok: true, message: "user added",
            data: {
                userId: userObjSavedtoDB.id,
            }
        })
    } catch (e) {
        res.status(500).json({
            ok: false, message: e.message,
        })
    }
}

exports.deleteUser = async (req, res, next) => {
    /***
     * url: /user/:userId
     * method: DELETE
     * input: params userId
     */
    try {
        const userId = req.params.userId;
        const user = await usersModel.findByPk(userId);
        if (!user) throw Error("user does not Exist")
        await user.destroy();
        res.status(200).json({
            ok: true, message: "user is deleted",
            deletedId: userId,
        })
    } catch (e) {
        res.status(500).json({
            ok: false, message: e.message,
        })
    }
}


exports.editUser = async (req, res, next) => {
    /***
     * url: /user/:userId
     * method: put
     * input: params userId and
     * PUT payload which is Json object of UserSchema
     */
    try {
        const userId = req.params.userId;
        const inputUser = req.body;
        let user = await usersModel.findByPk(userId);
        inputUser.id = user.id;
        for (let a in user.dataValues) user[a] = inputUser[a]
        await user.save();
        res.status(200).json({
            ok: true, message: "user is updated",
            data: {
                ...user.dataValues,
            }
        })
    } catch (e) {
        console.log(e.message)
        res.status(500).json({
            ok: false, message: e.message,
        })
    }
}



exports.getUser = async (req, res, next) => {
    /***
     * URl: /user 
     * input: quary i.e.) ?page=2
     * Method: GET
     */
    try {
        const query = {};
        const page = req.query.page ? Number(req.query.page) : 1;
        for (let e of ["id", "name", "phone", "email"])
            if (req.query[e]) query[e] = req.query[e];
        const fetchedData = await usersModel.findAll({
            where: query, offset: page * NUMBER_PER_PAGE,
            limit: NUMBER_PER_PAGE,
        });
        res.status(200).json({
            ok: true, message: "success fetched",
            data: fetchedData,
        })
    } catch (e) {
        res.status(500).json({
            ok: false, message: e.message,
        })
    }
}