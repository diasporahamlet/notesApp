const express = require("express")
const cors = require("cors")
require("dotenv").config()

const { connection } = require("./config/db")
const {indexRouter} = require("./routes/index.routes")


const app = express()


app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.json({msg:"Base Api"})
})
app.use("/api/v1",indexRouter)
const Port =process.env.Port
app.listen(Port,()=>{
    connection()
    console.log(`Listening on http://localhost:${Port}/`)
})