

import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'

import userRouter from './routes/user.route.js'

dotenv.config();

const app = express()
const PORT = 3000

app.use('/api/user', userRouter);

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Connection to Database Successful...")
}).catch((err)=>{
    console.log(err.message);
})

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}...`)
})