
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