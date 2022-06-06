import {Request, Response} from "express"
import User, { IUser } from "../models/user.model"
import jwt from "jsonwebtoken"

export const signup = async (req: Request, res: Response) => {
    try {
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })

        user.password = await user.encryptPassword(user.password);
        const savedUser = await user.save();
        if(!savedUser) return res.status(400).json("Not found.")

        const token: string = await jwt.sign({_id: savedUser._id}, process.env.SECRET_KEY || "secret_key")

        res.json(token)

    }catch(err) {
        console.log(err)
    }  
}

export const signin = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if(!user) return res.status(400).json("Email or password is wrong.")

        const validPassword = await user.validatePassword(req.body.password)
        if(!validPassword) return res.status(400).json("Invalid password.")

        const token: string = jwt.sign({_id: user._id}, process.env.SECRET_KEY || "secret_key", {
            expiresIn: 60 * 60 * 24
        })

        res.header("auth-token", token).json(user)

    } catch(err) {
        console.log(err)
    }
}

export const profile = async (req: Request, res: Response) => {
    const user = await User.findById(req.userId).select("-__v -password -createdAt");
    if(!user) return res.status(404).json("Not user")
    res.json(user)
}
