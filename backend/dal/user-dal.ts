import User from '../models/user-model'

const print = console.log

export async function createUser({name,email,image,provider}:
    {name:string,email:string,image:string,provider:string}){
    try{
        const user = await findUserByEmail(email,provider)
        if(user) return user
        const newUser = await new User({
            name,
            email,
            image,
            provider
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