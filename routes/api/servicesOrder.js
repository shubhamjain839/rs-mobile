const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const Credits = require('../../models/Credits')
const {check,validationResult} = require('express-validator')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const InvoiceNumber = require('../../models/InvoiceNumber')
const Transporter = require('../../util/Transporter')
const ServicesOrder = require('../../models/ServicesOrder')

//Api /api/servicesOrder
//GET
//Display all Services orders
//Access Admin

router.get('/',
    authAdmin,
    async (req,res)=>{
    try {
        const servicesOrder = await ServicesOrder.find()
        res.json(servicesOrder)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error !')
    }
})

//Api /api/servicesOrder/user
//GET
//Display Services Order by user id
//Access Private

router.get('/user',
    auth,
    async (req,res)=>{
    try {
        const servicesOrder = (await ServicesOrder.find()).filter(serviceOrder => serviceOrder.user.id == req.user.id)
        res.json(servicesOrder)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error !')
    }
})

//Api /api/servicesOrder/
//POST
//Place servicesOrder by user
//Access Private

router.post('/',
    [
        auth, 
        [
            check('imei','This field is required !').notEmpty(),
        ]
    ],
    async (req,res)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()) return res.status(500).json({errors:errors.array()})
        try {
            const {ServiceCredit,imei,notes,serviceName,category} = req.body
            const {name,email,contact,_id} = await User.findById(req.user.id)
            const {credits} = await Credits.findOne({user:_id})
            if(ServiceCredit > credits) return res.status(200).json({errors:[{msg:'You dont have much credits !'}]}) 
            // const nnnn = new InvoiceNumber({})
            // await nnnn.save()
            let invoice = (await InvoiceNumber.find())[0]
            //console.log(invoice)
            invoice.invoiceID += 1
            await InvoiceNumber.findByIdAndUpdate(invoice._id,{$set:{invoiceID:invoice.invoiceID}})
            const serviceOrder =  new ServicesOrder({
                invoiceID:invoice.invoiceID,
                user:{
                    id:_id,
                    name,
                    email,
                    contact,
                },
                serviceName,
                category,
                imei,
                credits,
                notes,
            })
            await serviceOrder.save();
            await Credits.findOneAndUpdate({user:_id},{$inc:{credits:-ServiceCredit}})
            Transporter.sendMail({
                to:email,
                subject:'RS Mobile Service Order Placed',
                html:`Hello there, <br/> 
                    This email is to inform you that your order of imei/SN ${imei} Service is placed Successfully.<br/>
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

//Api /api/servicesOrder/resolve/:id
//POST
//Resolve user Service Order
//Access Admin

router.post('/resolve/:id',
    authAdmin,
    async (req,res)=>{
        try {
            const {email,invoiceID,imei} = req.body
            //await Credits.findOneAndUpdate({user:req.params.id},{$inc:{credits}})
            await ServicesOrder.findOneAndUpdate({invoiceID},{$set:{isCompleted:true}})
            Transporter.sendMail({
                to:email,
                subject:'RS Mobile is in process',
                html:`Hello there, <br/> 
                    This email is to inform you that your service for IMEI/SN ${imei} is in process and will complete shortly. <br/>
                    Invoice no: ${invoiceID}.<br/>
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
