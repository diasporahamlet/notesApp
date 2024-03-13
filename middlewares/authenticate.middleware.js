const jwt = require("jsonwebtoken");
require("dotenv").config();

const authentication = (req, res, next)=>{
    const token = req.headers?.authorization?.split(" ")[1]
    try {
        if(!token){
            return res.status(403).send("please login")
        }
        jwt.verify(token,process.env.jwtSec,(err, decoded)=>{
            if(err){
                console.log(err)
                return res.status(403).json(err.message)
            }
        
            req.user = decoded
            next()
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).send("internal server error")
        
    }
}
module.exports = {authentication}