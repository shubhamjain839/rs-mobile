const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req,res,next) => {
    const token = req.header('x-auth-token')
    if(!token) return res.status(401).json({msg:'No token found'})
    try {
        const {user,isAdmin} = jwt.verify(token,config.get('jwtSecret'))
        if(!isAdmin) return res.status(401).json({msg:'Unauthorized Access !'})
        req.user = user
        next() 
    } catch (err) {
        res.status(401).json({msg:'Token is not valid'})
    }
}