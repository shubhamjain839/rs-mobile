const mongoose = require('mongoose')
//const AutoIncrement = require('mongoose-auto-increment')
const CreditsOrderSchema = new mongoose.Schema({
    invoiceID:{
        type:Number,
        required:true,
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
    service:{
        type:String,
        default:'Credits',  
    },
    credits:{
        type:Number,
        required:true,
    },
    amount:{
        type:Number,
        required:true,
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

module.exports = CreditsOrder = mongoose.model('creditsOrders',CreditsOrderSchema)