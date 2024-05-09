import jwt, { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv'


dotenv.config()

const jwtSecret = process.env.JWT_SECRET || 'RANDOM'
export const generateToken=(payload:{email:string,id:string}):string=>jwt.sign(payload,jwtSecret,{})

export const verifyToken=(token:string):JwtPayload|string=>jwt.verify(token,jwtSecret)