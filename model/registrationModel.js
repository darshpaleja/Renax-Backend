var mongoose = require('mongoose')

var UserSchema = mongoose.Schema({
    name : {
        type : String , 
        required : true
    } ,
    phone : {
        type : Number,
        required : true
    } ,
    email : {
        type : String , 
        required : true , 
        unique : true
    } , 
    password : {
        type : String , 
        required : true
    },
    fcmToken : {
        type : String
    },
    createdAt : {
        type : Date , 
        default : Date.now
    }
})

module.exports = mongoose.model('Registration' , UserSchema)