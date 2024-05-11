import User from '../models/user-model'

const print = console.log

export async function createUser({name,email,image,provider,username}:
    {name:string,email:string,image:string,provider:string,username:string}){
    try{
        const user = await findUserByEmail(email,provider)
        if(user) return user
        const newUser = await new User({
            name,
            email,
            image,
            provider,
            username
        }).save()
        return newUser
    }
    catch(error){
        console.error("Error creating user:",error)
    }
}


export async function findUserByEmail(email:string,provider:string){
    try{
        const user = await User.findOne({email,provider})
        return user
    }
    catch(error){
        console.error("Error finding user by email:",error)
    }
}

export async function updateReadingList(uId:string,aId:string,event:'add'|'remove'){
    try{
        const action = {
            'add':{
                $addToSet:{
                    'savedArticles':aId
                }
            },
            'remove':{
                $pull:{
                    'savedArticles':aId
                }
            }
        }
        await User.findByIdAndUpdate(uId,action[event],{new:true})
        return 
    }
    catch(error:any){
        console.error("Error adding article to reading list:",error)
        throw Error(error.message)
    }
}
