

import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();

const app = express()
const PORT = 3000

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Connection to Database Successful...")
}).catch((err)=>{
    console.log(err.message);
})

app.get('/', (req, res)=>{
    res.send('Hello My Guy!')
})

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}...`)
})