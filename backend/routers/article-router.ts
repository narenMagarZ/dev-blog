import express from 'express'

const articleRouter = express.Router()

articleRouter.get('/',(req,res)=>{
    res.send('okay')
})

articleRouter.post('/add')



export default articleRouter
