"use client"
import { FcLike } from "react-icons/fc";
import { FaRegComment } from "react-icons/fa6";
import SaveBtn from "@/app/component/save-btn";
import axios from "axios";

interface ActionBarProps {
    articleId:string
    reactionCount:number
    isReacted:boolean
    commentCount:number
    isArticleSaved:boolean
}

export default function ActionBar({
    reactionCount,
    articleId,
    isArticleSaved,
    isReacted,
    commentCount
}:ActionBarProps){
    return(
        <aside className="flex flex-col gap-y-4  p-2 items-center">
            <div className="flex flex-col gap-y-2 items-center">
                <button 
                onClick={()=>{
                    axios
                    .post('http://localhost:5000/api/article/reaction',{aId:articleId,event:'add'})
                    .then(res=>{
                        console.log(res.data)
                    }).catch(error=>{
                        console.error(error)
                    })
                }}
                className="hover:bg-[#3B49DF1a] rounded-md p-2">
                    <FcLike color={"white"} size={20}/>
                </button>
                <span className="text-xs">{reactionCount}</span>
            </div>
            <div className="flex flex-col gap-y-2 items-center">
                <button 
                onClick={()=>{

                }}
                className="hover:bg-[#3B49DF1a] rounded-md p-2">
                    <FaRegComment/>
                </button>
                <span className="text-xs">{commentCount}</span>
            </div>
            <div className="">
                <SaveBtn aId={articleId} isSaved={isArticleSaved} />
            </div>
            <div></div>
        </aside>
    )
}