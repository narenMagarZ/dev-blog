import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{type:String,unique:true,required:true},
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    image:{type:String},
    provider:{type:String,required:true,enum:['google','github']},
    savedArticles:{
        type:[{type:mongoose.Types.ObjectId,ref:'articles',default:[]}]
    }
},{timestamps:true})

const User = mongoose.model('user',userSchema)
export default User