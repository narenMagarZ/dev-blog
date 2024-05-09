import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    image:{type:String},
    provider:{type:String,required:true,enum:['google','github']}
},{timestamps:true})

const User = mongoose.model('user',userSchema)
export default User