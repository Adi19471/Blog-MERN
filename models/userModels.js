const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({

    username:{
        type:String,
        required:[true,"Username is Required"]
    },

    email:{
        type:String,
        required:[true,"email is Required"]
    },

    password:{
        type:String,
        required:[true,"password is required"]
    },



    blogs:[
        {
            type:mongoose.Types.ObjectId,
            ref:'Blog',
        }
    ]
},{timestamps:true})


const userModel = mongoose.model('user',UserSchema)
module.exports = userModel