const express = require('express')
const router = express.Router()
const {check,validationResult} = require('express-validator')
const authAdmin = require('../middleware/authAdmin')
const Categories = require('../../models/Categories')


//Api /api/categories
//GET
//Display all categories

router.get('/',async (req,res)=>{
    try {
        const categories = await Categories.find()
        res.json(categories)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error !')
    }
})


//Api /api/categories/add
//POST
//Add new categories

router.post(
    '/add',
    [
        authAdmin,
        check('name','Name is required !').notEmpty(),        
    ],
    async (req,res)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()) return res.status(500).json({errors:errors.array()})
        try {
            const {name} = req.body
            const category = new Categories({
                name,
            })
            const result = await category.save()
            if(result) return res.json({msg:'Category Added Successfully'})
        } catch (err) {
            console.log(err.message)
            res.status(500).send('Server Error !')
        }
    }
)

//Api /api/categories/:id
//DELETE
//Delete categories

router.delete(
    '/:id',
    authAdmin,
    async (req,res)=>{
        try {
            const result = await Categories.findByIdAndDelete(req.params.id)
            if(result) return res.json({msg:'Category Deleted Successfully'})
            return res.json({msg:'No category found !'})
        } catch (err) {
            console.log(err.message)
            res.status(500).send('Server Error !')
        }
    }
)

module.exports = router