import { Request, Response, NextFunction } from "express";
import { createUser, updateReadingList } from "../dal/user-dal";
import dotenv from 'dotenv'
import AppError from "../app-error";
import { generateToken } from "../helper";
import {generateFromEmail} from 'unique-username-generator'
dotenv.config()
const print = console.log


const createUsername=(email:string)=>generateFromEmail(email,4)
export async function enter(req:Request,res:Response,next:NextFunction){
    const {name,email,image,provider} = req.body
    try{
        const username = createUsername(email)
        const user = await createUser({
            name,
            email,
            provider,
            image,
            username
        })
        if(user){
            const token = generateToken({email:user.email,id:user.id})
            return res.json({message:"Enter successfully",token})
        }
        else return res.send("Enter failed")
    }
    catch(error:any){
        console.error("Error entering:",error)
        return next(new AppError(error.message,500))
    }
}

export async function likePost(req:Request,res:Response,next:NextFunction){
    try{
        
    }
    catch(err){
        console.error("Error liking post:",err)
    }
}

export async function commentOnPost(req:Request,res:Response,next:NextFunction){
    try{
        
    }
    catch(err){
        console.error("Error commenting on post:",err)
    }
}


export async function getPosts(req:Request,res:Response,next:NextFunction){
    try{
        
    }
    catch(err){
        console.error("Error geting posts:",err)
    }
}

export async function getPostWithId(req:Request,res:Response,next:NextFunction){
    try{
        
    }
    catch(err){
        console.error("Error getting post with id:",err)
    }
}


export async function getProfile(req:Request,res:Response,next:NextFunction){
    try{
        
    }
    catch(err){
        console.error("Error getting profile:",err)
    }
}

export async function updateProfile(req:Request,res:Response,next:NextFunction){
    try{
        
    }
    catch(err){
        console.error("Error updating profile:",err)
    }
}

export async function addOrRemoveArticleFromReadingList(req:Request,res:Response,next:NextFunction){
    const {aId,event} = req.body
    try{
        // const uId = "663f00419e3d34ccfd17b0ad"
        const uId = "663f00419e3d34ccfd17b0ad"
        await updateReadingList(uId,aId,event)
        return res.send("succeed")
    }
    catch(error:any){
        console.error("Error adding or removing article from reading list:",error)
        return next(new AppError(error.message,500))
    }
}