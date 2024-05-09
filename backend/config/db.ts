import mongoose from "mongoose";

export default function connectToDb(){
    mongoose.connect('mongodb://127.0.0.1:27017/blog')
    .then(()=>{
        console.log("successfully connected to db")
    })
    .catch(err=>{
        console.error("Error connecting to db:",err)
    })
}

