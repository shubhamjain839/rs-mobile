const nodeMailer = require('nodemailer')
const config = require('config')

module.exports = nodeMailer.createTransport({
    service:'Gmail',
    auth:{
        user:config.get('GMAIL_EMAIL'),
        pass:config.get('GMAIL_PASS'),
    },
})


