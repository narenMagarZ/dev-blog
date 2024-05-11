import mongoose from "mongoose";


const articleLikeSchema = new mongoose.Schema({
    aId:{type:mongoose.Types.ObjectId,required:true,ref:'article'},
    uId:{type:mongoose.Types.ObjectId,required:true,ref:'user'}
},{timestamps:true})

const Reaction = mongoose.model('article-like',articleLikeSchema)
export default Reaction