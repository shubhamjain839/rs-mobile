const express = require('express')
const ConnectDB = require('./config/db')
//Initializing Express Application
const app = express()
//PORT Number 
const PORT = process.env.PORT || 5000
//Connecting database
ConnectDB()
//Routes 

app.get('/',(req,res)=>{
    res.send("Hello")
})

//Listening port number  
app.listen(PORT,()=> console.log('Server Started'))