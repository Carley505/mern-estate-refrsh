
import { hashSync } from "bcrypt";
import User from "../models/user.model.js"

export const signup = async (req, res) =>{
    const { username, email, password } = req.body

    const hashPassword = hashSync(password, 10);
    const newUser = new User({ username, email, password: hashPassword });

    try{
        await newUser.save();
        res.status(201).json({ message: "User created Successfully." })
    }catch(err){
        res.status(500).json(err.message)
    }
}