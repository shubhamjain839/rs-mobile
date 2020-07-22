const mongoose = require('mongoose')
const CreditOrder = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
})