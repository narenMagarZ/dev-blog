"use client"

import axios from "axios"

export default function SaveBtn({aId,isSaved}:{aId:string,isSaved:boolean}){
    return(
        <button
        onClick={()=>{
            axios.post('http://localhost:5000/api/user/readinglist',{aId,event:isSaved?'remove':'add'})
        }}>
            <svg
            className="group hover:bg-[#3B49DF1a] rounded-md"
            width="24" height="24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path 
            className={ isSaved ?"fill-[#2F3AB2]" :"group-hover:fill-[#2F3AB2]"} d="M6.75 4.5h10.5a.75.75 0 01.75.75v14.357a.375.375 0 01-.575.318L12 16.523l-5.426 3.401A.375.375 0 016 19.607V5.25a.75.75 0 01.75-.75zM16.5 6h-9v11.574l4.5-2.82 4.5 2.82V6z"></path></svg>
        </button>
    )
}
