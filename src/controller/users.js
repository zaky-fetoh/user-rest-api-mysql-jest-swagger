const { usersModel } = require("../model/users")


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
     * input: params user Id
     */
    try{const userId = req.params.userId; 
    const user = await usersModel.findByPk(userId);
    await user.destroy();
    res.status(200).json({
        ok:true, message:"user is deleted",
        deletedId: userId,
    })
    }catch(e){
        res.status(500).json({
            ok:true, message: e.message,
        })
    }
}

