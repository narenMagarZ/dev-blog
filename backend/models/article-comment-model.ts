import mongoose from "mongoose";


const articleCommentSchema = new mongoose.Schema({
    aId:{type:mongoose.Types.ObjectId,required:true,ref:'article'},
    uId:{type:mongoose.Types.ObjectId,required:true,ref:'user'},
    comment:{type:String},
    replyTo:{type:mongoose.Types.ObjectId,ref:'comment'},
},{timestamps:true})

const AComment = mongoose.model('comment',articleCommentSchema)
export default AComment