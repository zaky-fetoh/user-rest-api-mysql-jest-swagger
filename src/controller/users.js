const {usersModel} = require("../model/users")


exports.addUser = async(req, res, next)=>{
    try{
    const user  = req.body
    const userObjSavedtoDB = await usersModel.create(user);
    res.status(200).json({
        ok:true, message:"user added", 
        data:{
            userId: userObjSavedtoDB.id,
        }
    })
    }catch(e){
        res.status(500).json({
            ok:false, message:e.message,
        })
    }
}

exports.