import mongoose from 'mongoose'

const articleSchema = new mongoose.Schema({
    title:{type:String,required:true},
    coverImage:{type:String},
    content:{type:String},
    contentImage:{type:[String],default:[]}
},{timestamps:true})


const Article = mongoose.model('article',articleSchema)
export default Article