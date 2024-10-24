
import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import bodyParser from "body-parser"

import authRouter from "./routes/auth.route.js"
import userRouter from "./routes/user.route.js"


const app = express();
dotenv.config();
const PORT = 3000;

app.use(bodyParser.json())

try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connection to database Established...")
} catch (error) {
    console.log(error.message);
}

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}...`)
})


app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error."

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
     });
})