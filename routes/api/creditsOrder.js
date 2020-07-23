const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const Credits = require('../../models/Credits')
const {check,validationResult} = require('express-validator')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const CreditsOrder = require('../../models/CreditsOrder')
const InvoiceNumber = require('../../models/InvoiceNumber')
const Transporter = require('../../util/Transporter')

//Api /api/creditsOrder
//GET
//Display all creditsOrder
//Access Admin

router.get('/',
    authAdmin,
    async (req,res)=>{
    try {
        const creditsOrder = await CreditsOrder.find()
        res.json(creditsOrder)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error !')
    }
})

//Api /api/creditsOrder/user
//GET
//Display creditsOrder by user id
//Access Private

router.get('/user',
    auth,
    async (req,res)=>{
    try {
        const creditsOrder = (await CreditsOrder.find()).filter(creditOrder => creditOrder.user.id == req.user.id)
        res.json(creditsOrder)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error !')
    }
})

//Api /api/creditsOrder/
//POST
//Place creditsOrder by user
//Access Private

router.post('/',
    [
        auth,
        [
            check('credits','Min 100 credits are requried').isNumeric().isInt({
                min:100,
            })
        ]
    ],
    async (req,res)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()) return res.status(500).json({errors:errors.array()})
        try {
            const {name,email,contact,_id} = await User.findById(req.user.id)
            const {credits,amount} = req.body
            // const nnnn = new InvoiceNumber({})
            // await nnnn.save()
            let invoice = await InvoiceNumber.find()
            //console.log(invoice[0])
            invoice[0].invoiceID += 1
            await InvoiceNumber.findByIdAndUpdate(invoice[0]._id,{$set:{invoiceID:invoice[0].invoiceID}})
            const creditOrder =  new CreditsOrder({
                invoiceID:invoice[0].invoiceID,
                user:{
                    id:_id,
                    name,
                    email,
                    contact,
                },
                credits,
                amount,
            })
            await creditOrder.save();
            Transporter.sendMail({
                to:email,
                subject:'RS Mobile Order Placed',
                html:`Hello there, <br/> 
                    This email is to inform you that your order of ${req.body.credits} Credits is placed Successfully.<br/>
                    Thanks for Visiting US<br/>
                    <br/><br/>
                    Regards,<br/>
                    RS Mobile.`
            })
            return res.status(200).json({msg:'Order placed Successfully !'})
        } catch (err) {
            console.log(err.message)
            res.status(500).send('Server Error !')
        }
    }
)

//Api /api/creditsOrder/resolve/:id
//POST
//Resolve user Credits Order and add credits to the user
//Access Admin

router.post('/resolve/:id',
    authAdmin,
    async (req,res)=>{
        try {
            const {email,credits,invoiceID} = req.body
            await Credits.findOneAndUpdate({user:req.params.id},{$inc:{credits}})
            await CreditsOrder.findOneAndUpdate({invoiceID},{$set:{isCompleted:true}})
            Transporter.sendMail({
                to:email,
                subject:'RS Mobile Credits Credited to your Acoount',
                html:`Hello there, <br/> 
                    This email is to inform you that your order of ${req.body.credits} Credits is completed and added to your account for invoice no ${invoiceID}.<br/>
                    Thanks for Visiting us<br/>
                    <br/><br/> 
                    Regards,<br/>
                    RS Mobile.`
            })
            return res.status(200).json({msg:'Order Completed !'})
        } catch (err) {
            console.log(err.message)
            res.status(500).send('Server Error !')
        }
    }
)


module.exports = router
