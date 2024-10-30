
import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import { errorHandler } from "../utils/error.js"

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