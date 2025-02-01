var jwt = require('jsonwebtoken')
var userModel = require('../model/registrationModel')
require('dotenv').config()

exports.tokenSecure = async (req , res , next) => {

    try {
        let token = req.headers.authorization
        // console.log(token);
        if(!token) throw new Error('Please Attach Token')
        let tokenVerify = jwt.verify(token , process.env.SECRET_KEY)
        // console.log(tokenVerify , 'token verified');
        let userVerify = await userModel.findById(tokenVerify.id)
        if(!userVerify) throw new Error('User Not Found')
            
            next()

    } catch (error) {
        res.status(404).json({
            status : 'Fail' , 
            Message : error.message
        })
    }
}