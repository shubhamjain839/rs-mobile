const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    confirmed:{
    	type:Boolean,
    	default:false,
    },
    password:{
        type:String,
        required:true,
    },
    contact:{
        type:String,
        required:true,
        unique:true,
    },
    address:{
        type:String,
    },
    city:{
        type:String,
    },
    zipcode:{
        type:String,
    },
    state:{
        type:String,
    },
    country:{
        type:String,
    },
    shopname:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
})

module.exports = User = mongoose.model('users',UserSchema)
