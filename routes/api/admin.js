const express = require('express')
const config = require('config')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../../models/User')
const Credits = require('../../models/Credits')
const bcrypt = require('bcryptjs')
const {check,validationResult} = require('express-validator')
const nodeMailer = require('nodemailer')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

//Api /api/admin/get-all
//GET
//Display all users

router.get('/get-all',authAdmin,async (req,res)=>{
    try{
        // let user = await User.findById(req.user.id)    
        // if(!user.isAdmin) return res.status(400).json({errors :[{msg:'Authentication falied !'}]})
        const users = await User.find().select(['-password','-confirmed','-isAdmin']);
        res.json(users)
    }
    catch(err){
        console.log(err.message);
        res.status(500).send("Server Error !")
    }
})

//Api /api/admin/add-credits/:id
//POST
//Add Credits to users

router.post('/add-credits/:id',
[   
    authAdmin,
    [
        check('credit','Invalid Credits').isNumeric().isInt({gt:0}),
    ],
],
async (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()) return res.status(500).send({errors:errors.array()})
    try{
        // let admin = await User.findById(req.user.id)    
        // if(!admin.isAdmin) return res.status(400).json({errors :[{msg:'Authentication falied !'}]})
        let user = await User.findById(req.params.id)    
        const {credit} = req.body 
        if(!user) return res.status(400).json({errors:[{msg:'User not Found !'}]})
        await Credits.findOneAndUpdate({user:user.id},{$inc : {credits:credit}})
        res.status(200).json({msg:'Credits updated Successfully !'})
    }
    catch(err){
        console.log(err.message);
        res.status(500).send("Server Error !")
    }
})

module.exports = router