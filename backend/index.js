const express = require('express')
const cors = require("cors")
const app = express()
require("dotenv").config();
const mongoose=require("mongoose")
const route = require ("./route")
mongoose.set('strictQuery', true)
const cookieParser = require("cookie-parser")

app.use(cors())
app.use(express.json())
app.use(cookieParser())


mongoose.connect(process.env.MONGO_CONNECTION,{useNewUrlParser:true})
.then(()=>{
    console.log("MongoDB is Connected..")
}).catch(err=>{
    console.log(err.message);
})


app.use('/',route)


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})