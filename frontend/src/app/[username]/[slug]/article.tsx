"use client"
import Image from "next/image"
import Link from "next/link"
import Parser from 'html-react-parser'
import Comment from "./comment"
import {useParams} from 'next/navigation'
import axios from "axios"
import { useEffect, useState } from "react"
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
export default function Article({
    date,
    user,
    id,
    coverImage,
    title,
    tags,
    content
}:ArticleProps){



    return(
        <div className="bg-white rounded-md p-2 border w-[700px]">
            <article >
                {
                    coverImage && 
                    <Image src={coverImage} alt="" height={100} width={100} />
                }
                <div className="flex gap-x-2">
                    <Image src={user.image} className="rounded-full border" alt="" height={40} width={40} />
                    <div className="flex flex-col">
                        <Link className="" href={`/${user.username}`}>{user.name}</Link>
                        <time dateTime={date.updatedAt} className="text-xs">{date.postedDistanceFromNow}</time>
                    </div>

                </div>
                <div className="flex flex-col gap-y-2">
                    <h1 className="p-2 text-2xl font-semibold">{title}</h1>
                    <div className="flex items-center gap-x-2">
                        {
                            tags.map((tag,i)=>(
                                <Link 
                                key={i}
                                style={{width:"max-content"}}
                                className="rounded text-sm px-2 py-1 hover:bg-slate-100" href={`/t/${tag}`}>#{tag}</Link>
                            ))
                        }
                    </div>
                    <div className="p-2">
                        {
                            Parser(content)
                        }
                    </div>
                    </div>
                    <Comment/>
            </article>
        </div>
    )
}

