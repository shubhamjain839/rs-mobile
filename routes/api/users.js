const express = require('express')
const config = require('config')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const {check,validationResult} = require('express-validator')
const nodeMailer = require('nodemailer')
const auth = require('../middleware/auth')
const Credits = require('../../models/Credits')



const transporter = nodeMailer.createTransport({
    service:'Gmail',
    auth:{
        user:config.get('GMAIL_EMAIL'),
        pass:config.get('GMAIL_PASS'),
    },
})


//Api /api/users/
//POST 
//Add user

router.post('/',
    [
        check('name','Name Required !').notEmpty(),
        check('email','Email is not Valid !').isEmail(),
        check('password','Password Required !').notEmpty().isLength({
            min:6
        }),
        check('contact','Contact is Required !').isNumeric(),
        check('shopname','Shop Name is Required !').notEmpty(),
    ],
    async (req,res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) return res.status(400).json({errors:errors.array()})
        const {name,email,password,contact,address,city,zipcode,state,country,shopname} = req.body
        try {
            let user = await User.findOne({$or:[{email},{contact}]})
            if(user) return res.status(400).json({errors : [{msg:'User Already exists !'}]})
            user = new User({
                name,
                email,
                password,
                contact,
                address,
                city,
                zipcode,
                state,
                country,
                shopname,
            })
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(password,salt)
            await user.save()
            let credits = new Credits({
                user,
                name,
            })
            credits.user = user.id
            credits.name = user.name
            await credits.save()
            const payload = {
                user:{
                    id:user.id
                }
            }
            jwt.sign(
                payload,
                config.get('emailSecret'),
                (err,token)=>{
                    if(err) throw err
                    const url = `http://localhost:5000/api/users/confirmation/${token}`
                    transporter.sendMail({
                        to:user.email,
                        subject:'RS Mobile Confirm Email',
                        html:`Please Click the below link to verify your account <a href="${url}">${url}</a>`
                    })
                }
            )
            jwt.sign(
                payload,
                config.get('jwtSecret'),
                {
                    expiresIn:360000
                },
                (err,token)=>{
                    if(err) throw err
                    res.json({token})
                }
            )
        } catch (err) {
            console.log(err.message)
            res.status(500).send('Server Error !')
        }
    }
)

//Api /api/users/confirmation/:token
//GET 
//Verify User

router.get('/confirmation/:token',async (req,res) => {
    try {
        const {user:{id}}  = jwt.verify(req.params.token,config.get('emailSecret'))
        const user = await User.findById(id)
        if(!user) return res.status(404).json({errors:[{msg:"User doesn't exist !"}]})
        await User.updateOne({_id:id},{$set:{confirmed:true}})
        res.status(200).json({msg:'User verified !'})
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error !')
    } 
})

//Api /api/users/modify
//POST 
//Modify user

router.post('/modify',
    [
        auth,
        [
            check('name','Name Required !').notEmpty(),
            check('address','Address is Required !').notEmpty(),
            check('city','City Required !').notEmpty(),
            check('zipcode','ZipCode must be Valid !').isLength({min:6 ,max:6}),
            check('state','State is Required !').notEmpty(),
            check('country','Country is Required !').notEmpty(),
            check('contact','Contact is Required !').isNumeric().isLength({min:10,max:10}),
            check('shopname','Shop Name is Required !').notEmpty(),
        ]
    ],
    async (req,res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) return res.status(400).json({errors:errors.array()})
        const {name,contact,address,city,zipcode,state,country,shopname} = req.body
        try {
            let user = await User.findOne({contact})
            if(user && user.id !== req.user.id) return res.status(400).json({errors : [{msg:'This is number is already linked to different account !'}]})
            const result = await User.updateOne({_id:user.id},{$set:{name,contact,address,city,zipcode,state,country,shopname}})   
            if(result) return res.status(200).json({msg:'Profile Updated Successfully !'})
        } catch (err) {
            console.log(err.message)
            res.status(500).send('Server Error !')
        }
    }
)


module.exports = router;