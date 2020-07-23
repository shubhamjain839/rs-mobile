const mongoose = require('mongoose')
const ServicesSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true
    },
    category:{
        type:String,
        ref:'categories',
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    time:{
        type:String,
        required:true,
    },
    detail:{
        type:String,
    },
    isEnable:{
        type:Boolean,
        default:true,
    },
})

module.exports = Services = mongoose.model('services',ServicesSchema)