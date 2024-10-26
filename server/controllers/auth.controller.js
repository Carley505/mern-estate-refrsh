
import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const signup = async(req, res, next) =>{
    const { username, email, password } = req.body
    
    try {
        const hashPassword = bcrypt.hashSync(password, 10)
        const newUser = new User({ username, email, password: hashPassword })
        await newUser.save()
        res.status(200).json({ message: "User added Successfully." })
    } catch (error) {
       next(error)
    }
}

export const signin = async(req, res, next) =>{
    const { email, password } = req.body

    try {
        const validUser = await User.findOne({ email })
        if(!validUser){
            return next(errorHandler(404, "User not Found!"))
        }
        const hashPassword = validUser.password
        const validPassword = bcrypt.compareSync(password, hashPassword)
        if(!validPassword){
            return next(errorHandler(401, "Wrong Credentials!"))
        }
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)
        const { password: pass, ...rest } = validUser._doc
        res.cookie('access_token', token, { httpOnly: true })
           .status(200)
           .json(rest)
    } catch (error) {
        next(error)
    }
}