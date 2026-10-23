import "dotenv/config"
import express from "express"
import cors from "cors"

import { ConnectDB } from "./config/db.js"
import connectCloudinary from "./config/cloudinary.js"

// app config
const app = express()
const port = process.env.PORT || 4000
ConnectDB()
connectCloudinary()

// middleware

app.use(express.json())
app.use(cors())

// API endpoints

app.get("/",(req,res)=>{
    res.send("API WORKING")
})

app.listen(port,()=>{
    console.log("server started");
    
})