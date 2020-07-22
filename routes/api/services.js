const express = require('express')
const config = require('config')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../../models/User')
const Credits = require('../../models/Credits')
const Services = require('../../models/Services')
const bcrypt = require('bcryptjs')
const {check,validationResult} = require('express-validator')
const nodeMailer = require('nodemailer')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const Categories = require('../../models/Categories')


//Api /api/services/
//GET
//Display all services

router.get('/',async (req,res)=>{
    try {
        const services = await Services.find()
        res.json(services)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error !')
    }
})


//Api /api/services/add
//POST
//Add new service

router.post(
    '/add',
    [
        authAdmin,
        check('name','Name is required !').notEmpty(),        
        check('category','Categoty is Required').notEmpty(),
        check('price','Price is required !').notEmpty(),
        check('time','Time is required !').notEmpty(),
    ],
    async (req,res)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()) return res.status(500).json({errors:errors.array()})
        try {
            const {name,category,price,time} = req.body
            const service = new Services({
                name,
                price,
                time,   
                category,
            })
            const result = await service.save()
            if(result) return res.json({msg:'Services Added Successfully'})
        } catch (err) {
            console.log(err.message)
            res.status(500).send('Server Error !')
        }
    }
)

//Api /api/services/:id
//DELETE
//Delete service

router.delete(
    '/:id',
    authAdmin,
    async (req,res)=>{
        try {
            const result = await Services.findByIdAndDelete(req.params.id)
            if(result) return res.json({msg:'Services Deleted Successfully'})
            return res.json({msg:'No service found !'})
        } catch (err) {
            console.log(err.message)
            res.status(500).send('Server Error !')
        }
    }
)



module.exports = router