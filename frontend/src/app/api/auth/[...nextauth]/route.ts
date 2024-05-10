import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import NextAuth from 'next-auth'
import axios from 'axios'
import {setCookie} from 'cookies-next'

const print =console.log
const handler = NextAuth({
    providers:[
        GoogleProvider({
            clientId:'278447342299-elof1pacqjt70edf0nalsnpgeb78e1s2.apps.googleusercontent.com',
            clientSecret:'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',
        }),
        GithubProvider({
            clientId:'Ov23liMyIGFgLYnVLbCx',
            clientSecret:'928f3c43607d8c6def81226686891f641c8f7097'
        }),
    ],
    callbacks:{
        async signIn({user,account}) {
            if(user && account){
                const {name,email,image} = user
                const {provider} = account
                // make api call to express server
                return axios.post('http://localhost:5000/api/user/enter',
                {name,email,image,provider}).then(res=>{
                    print(res.data)
                    // on receive token, store it as cookie
                    setCookie('token',res.data.token)
                    return true
                }).catch(error=>{
                    console.error(error)
                    return false
                })
            }
            else return false
        },
    },
    pages:{
        signIn:'/enter'
    }
})

export {handler as GET, handler as POST}

