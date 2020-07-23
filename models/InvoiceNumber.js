const mongoose = require('mongoose')
const InvoiceNumberSchema = new mongoose.Schema({
    invoiceID:{
        type:Number,
        default:1000,
    },
})

module.exports = InvoiceNumber = mongoose.model('invoiceNumber',InvoiceNumberSchema)