import {Response, Request, NextFunction} from "express"
import jwt from "jsonwebtoken"

export interface IPayload {
    _id: string,
    iat: number,
    exp: number
}

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("auth-token")
    if(!token) return res.status(401).json("Access Denied.")

    const payload = jwt.verify(token, process.env.SECRET_KEY || "secret_key") as IPayload;
    req.userId = payload._id
    
    next()
}