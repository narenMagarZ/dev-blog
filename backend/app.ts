import express, { Request,Response,NextFunction } from 'express'
import cors from 'cors'
import articleRouter from './routers/article-router'
import userRouter from './routers/user-router'
import AppError from './app-error'
import { upload } from './middlewares'
const app = express()

app.use(cors({
    origin:"http://localhost:3000"
}))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use('/images',express.static('uploads'))


app.post('/image-upload',upload.single('cover-image'),(req,res)=>{
    console.log(req.file)
    return res.json({'cover-image':`http://localhost:5000/images/${req.file?.filename}`})
})
app.use('/api/user',userRouter)
app.use('/api/article',articleRouter)


app.use((error:AppError,req:Request,res:Response,next:NextFunction)=>{
    const {message,code} = error
    return res.status(code).json({message})
})
export default app