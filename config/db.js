const mongoose = require("mongoose")
require("dotenv").config()
const connection = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to DB")
    } catch (error) {
        console.log(error)        
        console.log("Can't connect to DB")
    }
}

module.exports = {connection}