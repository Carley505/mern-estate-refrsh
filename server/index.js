
import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import cors from "cors"
import cookieParser from "cookie-parser"

import authRouter from "./routes/auth.route.js"
import userRouter from "./routes/user.route.js"
import listingRouter from "./routes/listing.route.js"


const app = express();
dotenv.config();
const PORT = 3000;

app.use(bodyParser.json())
app.use(cors())
app.use(cookieParser())

try {
    await mongoose.connect(process.env.MONGO_URL);
    // await mongoose.connect("mongodb+srv://callistusngeywa:callistus@cluster0.fp4abir.mongodb.net/estate-one");
    console.log("Connection to database Established...")
} catch (error) {
    console.log(error.message);
}

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/listing', listingRouter);

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