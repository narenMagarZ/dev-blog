import express, { NextFunction, Request,Response } from 'express'
import {
    likePost,
    commentOnPost,
    getPostWithId,
    getPosts,
    getProfile,
    updateProfile,
    enter} from '../controllers/user-controller'
import {validate} from '../middlewares'
import joi from 'joi'
const userRouter = express.Router()

const print = console.log

userRouter.post('/enter',validate({
    name:joi.string().required(),
    email:joi.string().email().required(),
    image:joi.string().required(),
    provider:joi.string().valid('github','google')
}),enter)
userRouter.get('/posts',getPosts)
userRouter.post('/like',likePost)
userRouter.post('/comment',commentOnPost)
userRouter.get('/post/:id',getPostWithId)
userRouter.get('/profile',getProfile)
userRouter.post('/profile',validate({}),updateProfile)
export default userRouter