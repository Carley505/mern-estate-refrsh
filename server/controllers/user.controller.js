
import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import { errorHandler } from "../utils/error.js"
import Bicycle from "../models/bicycle.model.js"

export const test = (req, res) =>{
    res.status(200).json({
        message: "Hello, this is a final test route."
    })
}

export const updateUser = async(req, res, next)=>{
    let { username, email, password, avatar } = req.body
    const id = req.params.id
    if(req.user.id !== id) return next(errorHandler(401, "You can only update your own account!"))
    try {
        if(password){
            password = bcrypt.hashSync(password, 10)
        }
        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                $set: {
                    username, email, password, avatar
                },
            },
            { new: true }
        );
    
        const { password: pass, ...rest } = updatedUser._doc
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}

export const getUser = async(req, res, next) =>{
    const userId = req.params.id
    try {
      const user = await User.findById(userId)
      if(!user) return next(errorHandler(404, "User Not Found!"))
      const { password: pass, ...rest } = user._doc
      res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}

export const getUsers = async(req, res, next) =>{
    try {
      const users = await User.find()
      if(!users) return next(errorHandler(404, "No user Found!"))
      res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async(req, res, next)=>{
    if(req.user.id !== req.params.id) return next(errorHandler(401, "You can Only delete your own account!"))
     try {
        await User.findByIdAndDelete(req.params.id)
        res.clearCookie('access_token')
        res.status(200).json('User has been deleted.')
     } catch (error) {
        next(error)
     }
}

export const adminDeleteUser = async(req, res, next)=>{
     try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json('User has been deleted.')
     } catch (error) {
        next(error)
     }
}

export const getUserBicycles = async(req, res, next)=>{
    const userId = req.params.id
    if(req.user.id !== userId) return next(errorHandler(401, "You Can only View your own bicycle listings!"))
    try {
        const bicycles = await Bicycle.find({userRef:userId})
        if(!bicycles) return res.status(400).json("No Bicycle Listing Created Yet.")
        res.status(200).json(bicycles)
    } catch (error) {
        next(error)
    }
}

export const deleteUserBicycle = async(req, res, next)=>{
    const bicycleId = req.params.bicycleId

    try {
        const bicycle = await Bicycle.findById(bicycleId)
        if(!bicycle) return next(errorHandler(404, "Bicycle Not Found!"))
        
        if(req.user.id !== bicycle.userRef) return next(errorHandler(401, "Only the User can delete."))
        const deltetedBicycle = await Bicycle.findByIdAndDelete(bicycleId)
        if(!deltetedBicycle) return next(404, "Listing does Not exist.")
        res.status(200).json('Listing has been deleted Succcessfully!')
    } catch (error) {
        next(error)
    }
}

