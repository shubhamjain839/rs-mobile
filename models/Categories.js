const mongoose = require('mongoose')
const CategoriesSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
})

module.exports = Categories = mongoose.model('categories',CategoriesSchema)