const express = require('express')
const config = require('config')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const {check,validationResult} = require('express-validator')
const auth = require('../middleware/auth')

//Api /api/auth/
//GET
//Get user info

router.get('/',auth,async (req,res)=>{
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.status(200).json(user)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

//Api /api/auth
//POST
//Login and get token

router.post('/',
    [
        check('email','Email is not valid !').isEmail(),
        check('password',"Password Can't be empty!").notEmpty(),
    ],
    async (req,res) => {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()) return res.status(401).json({errors:errors.array()})
            const {email,password} = req.body
            const user = await User.findOne({email})
            if(!user) return res.status(401).json({errors:[{msg:'Invalid credentials!'}]})
            const isMatch = await bcrypt.compare(password,user.password)
            if(!isMatch) return res.status(401).json({errors:[{msg:'Invalid Credentials!'}]})
            if(!user.confirmed) return res.status(400).json({errors:[{msg:'Account is not verified !'}]})
            const payload = {
                user:{
                    id:user.id,
                },
                isAdmin:user.isAdmin,
            }
            jwt.sign(
                payload,
                config.get('jwtSecret'),
                {
                    expiresIn:360000,
                },
                (err,token)=>{
                    if(err) throw err
                    res.json({token});
                }
            )
        } catch (err) {
            console.error(err.message)
            res.status(500).send('Server Error!')
        }
    }
)
module.exports = router