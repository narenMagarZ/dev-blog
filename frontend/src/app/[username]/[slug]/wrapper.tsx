"use client"
import Article from "./article"
import ActionBar from "./action-bar"
import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "next/navigation"
interface ArticleProps {
    id:string
    coverImage:string
    title:string
    content:string
    tags:string[]
    date:{
        postedDistanceFromNow:string
        updatedAt:string
    }
    user:{
        name:string
        image:string
        username:string
        id:string
    }
}
const print = console.log
export default function Wrapper(){
    const params = useParams()
    const [article,setArticle] = useState<ArticleProps>({
        id:'',
        coverImage:'',
        title:'',
        content:'',
        tags:[],
        date:{
            postedDistanceFromNow:'',
            updatedAt:''
        },
        user:{
            image:'',
            username:'',
            id:'',
            name:''
        }
    })

    function fetchArticle(){
        return Promise.
        resolve(axios.get(`http://localhost:5000/api/article/${params.username}/${params.slug}`))
    }
    useEffect(()=>{
        fetchArticle().then(res=>{
            print(res.data)
            setArticle(res.data)
        }).catch(error=>{
            console.error(error)
        })
        return ()=>{
            // controller.abort()
        }
    },[])
    return(
        <div className="flex justify-center">
            <ActionBar/>
            <div className="flex">
                <Article {...article} />
                <div className="">
                    {/* profile */}
                </div>
            </div>
        </div>
    )
}