const mongoose = require('mongoose')
//const AutoIncrement = require('mongoose-auto-increment')
const ServicesOrderSchema = new mongoose.Schema({
    invoiceID:{
        type:Number,
        required:true,
        unique:true,
    },
    user:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'users',
        },
        name:{
            type:String,
        },
        contact:{
            type:String,
        },
        email:{
            type:String,
        },
    },
    serviceName:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    service:{
        type:String,
        default:'Service',  
    },
    imei:{
        type:String,
        required:true,
    },
    credits:{
        type:Number,
        required:true,
    },
    notes:{
        type:String,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    isCompleted:{
        type:Boolean,
        default:false,
    },
})
// CreditsOrder.plugin(AutoIncrement.plugin,{
//     model:'CreditsOrder',
//     field:'invoiceID',
//     startAt:'1000',
//     incrementBy:'1',
// })

module.exports = ServicesOrder = mongoose.model('servicesOrders',ServicesOrderSchema)