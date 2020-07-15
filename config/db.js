const mongoose = require('mongoose')
const config = require('config')
const db = config.get('MongoURI')

//Connection to database 

const ConnectDB = async ()=>{
    try {
        await mongoose.connect(db,
            { 
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
            })
        console.log('Database Connected !')
    } catch (err) {
        console.error(err.message)
        process.exit(1)
    }
}
module.exports = ConnectDB

