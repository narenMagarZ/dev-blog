import multer from 'multer'
import {Request,Response,NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import joi from 'joi'

const jwtSecret = process.env.JWT_SECRET || "random"
const storage = multer.diskStorage({
    destination:(_req,_file,cb)=>{
        print(_file)
        cb(null,'./uploads/')
    },
    filename:(_req,file,cb)=>{
        const uSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const mType = file.mimetype.split("/")[1]
        print(file.mimetype.split('/')[1])
        cb(null,uSuffix+'.'+mType)
    }
})
export const upload = multer({storage})



const print = console.log
export function validate(args:any){
    return(req:Request,res:Response,next:NextFunction)=>{
        const schema = joi.object(args)
        const {error} = schema.validate(req.body)
        if(error){
            return res.json({
                message:error.details[0].message
            })
        }
        else next()
    }
}

export function auth(req:Request,res:Response,next:NextFunction){
    let token = req.headers['authorization']
    print(token,'token')
    if(token){
        token = token.split('Bearer ')[1]
        const payload = jwt.verify(token,jwtSecret)
        print(payload,'payload')
        // req.user = {id:'',email:''}
    }
}
