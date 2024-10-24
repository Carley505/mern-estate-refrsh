

import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import bodyParser from 'body-parser';

import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'

dotenv.config();

const app = express()
const PORT = 3000

app.use(bodyParser.json())

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Connection to Database Successful...")
}).catch((err)=>{
    console.log(err.message);
})

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}...`)
})

app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error.'

    return res.status(statusCode)
    .json({
        statusCode,
        message,
    });
    next()
})