import mongoose from 'mongoose'

const articleSchema = new mongoose.Schema({
    uId:{type:mongoose.Types.ObjectId,ref:'user'},
    title:{type:String,required:true},
    coverImage:{type:String},
    content:{type:String},
    tags:{type:[],default:[]},
    slug:{type:String,required:true},
    state:{type:String,default:'draft',enum:['publish','draft']},
    // contentImage:{type:[String],default:[]}
},{timestamps:true})


const Article = mongoose.model('article',articleSchema)
export default Article