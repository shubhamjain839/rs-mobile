const mongoose = require('mongoose')

const CreditSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
    },
    name:{
        type:String,
        required:true,
    },
    credits:{
        type:Number,
        default:0
    },
})

module.exports = Credit = mongoose.model('credit',CreditSchema)