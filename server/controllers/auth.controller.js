
import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const signup = async(req, res, next) =>{
    const { username, email, password, isAdmin } = req.body
    
    try {
        const hashPassword = bcrypt.hashSync(password, 10)
        const newUser = new User({ username, email, password: hashPassword, isAdmin })
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

export const google = async(req, res, next) =>{
    const { name, email, photo } = req.body

    try {
        const user = await User.findOne({ email })
        if(user){
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

            const { password: pass, ...rest } = user._doc
            return res.cookie("access_token", token, { httpOnly: true })
                      .status(200)
                      .json(rest);
        }else{
            const randomPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
            const hashPassword = bcrypt.hashSync(randomPassword, 10)
            const username = name.split(" ").join("").toLowerCase().slice(0, 8) + Math.random().toString(36).slice(-4)
            const newUser = new User({ username, email, password: hashPassword, avatar: photo })
            await newUser.save()
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)

            const { password: passs, ...rest } = newUser._doc
            res.cookie('access_token', token, { httpOnly:true }).status(200).json(rest)
        }
    } catch (error) {
        next(error)
    }
}

export const signout = async(req, res, next)=>{
    res.clearCookie('access_token')
    res.status(200).json('User logged Out successfully.')
}