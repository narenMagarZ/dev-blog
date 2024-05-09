"use client"
import axios from "axios"
import { useEffect, useRef, useState } from "react"
import Image from 'next/image'
import { RxCross2 } from "react-icons/rx";
import { LuBold, LuItalic, LuHeading} from "react-icons/lu";
import { PiLinkSimple } from "react-icons/pi";
import { FaCode, FaImage } from "react-icons/fa6";
import { BsCodeSquare } from "react-icons/bs";
import { MdOutlineFormatListNumbered,MdOutlineFormatListBulleted } from "react-icons/md";
const print =console.log
function fun(endPoint:string,method:string,data:any){
    axios(`http://localhost:5000/api/${endPoint}`,{
        method,
        data
    }).then(res=>{

    }).catch(error=>{
        console.error(error)
    })
}

export default function New(){
    const coverImageRef = useRef<HTMLInputElement>(null)
    const [title,setTitle] = useState('')
    const [content,setContent] = useState('')
    const [tags,setTags] = useState<any[]>([])
    const contentRef = useRef<HTMLTextAreaElement>(null)
    const [cursorPos,setCursorPos] = useState({s:0,e:0})
    const contentImageRef = useRef<HTMLInputElement>(null)
    const [coverImage,setCoverImage] = useState('')
    function publishArticle(){
    }
    function saveDraft(){}

    function updateContent(str:string,pos:{s:number,e:number}){
        if(contentRef.current){
            const cursorPos = contentRef.current.selectionStart
            const x = content.substring(0,cursorPos)
            const y = content.substring(cursorPos,content.length)
            const newContent = x + str + y
            setCursorPos({s:x.length+pos.s,e:x.length+pos.e})
            setContent(newContent)
            contentRef.current.focus()
        }
    }

    useEffect(()=>{
        if(contentRef.current){
            contentRef.current.setSelectionRange(cursorPos.s,cursorPos.e)
        }
    },[cursorPos])
    return(
        <div className="flex items-center flex-col justify-center">
            <div className="flex flex-col gap-y-2">
                <div>
                    {
                        coverImage && 
                        <div className="flex items-center gap-x-2">
                            <Image
                            src={coverImage} alt="cover-image" height={100} width={100} />
                            <div className="text-sm flex items-center gap-x-2">
                                <button 
                                onClick={()=>coverImageRef.current?.click()}
                                className="rounded px-2 border">Change</button>
                                <button
                                
                                className="rounded px-2 border">Remove</button>
                            </div>
                        </div>
                    }
                    <input 
                    onChange={(e)=>{
                        if(e.currentTarget.files){
                            const file = e.currentTarget.files[0]
                            const formData = new FormData()
                            formData.append('cover-image',file)
                            axios.post('http://localhost:5000/image-upload',formData)
                            .then(res=>{
                                if(res.status===200){
                                    print(res.data)
                                    setCoverImage(res.data['cover-image'])
                                }
                            }).catch(error=>{
                                console.error(error)
                            })
                        }
                    }}
                    type="file" accept="image/*" hidden ref={coverImageRef} />
                    <button
                    className="px-2 mt-2 text-sm py-1 border rounded"
                    onClick={()=>{
                        coverImageRef.current?.click()
                    }}
                    >Add a cover image</button>
                </div>
                <div>
                    <input 
                    className="text-sm px-2 py-1"
                    value={title}
                    onChange={(e)=>{
                        setTitle(e.currentTarget.value)
                    }}
                    placeholder="new  post title here..." />
                </div>
                <div className="flex items-center">
                    <div className="flex items-center gap-x-2">
                        {
                            tags.map((tag,i)=>(
                                <div 
                                key={i}
                                className="text-sm flex items-center gap-x-2 border rounded">
                                    # {tag}
                                    <button
                                    onClick={()=>{
                                        setTags(prev=>{
                                            prev.splice(i,1)    
                                            return [...prev]
                                        })
                                    }}
                                    >
                                        <RxCross2 size={14}/>
                                    </button>
                                </div>
                            ))
                        }
                    </div>
                    <input
                    className="text-sm px-2 py-1"
                    onChange={(e)=>{
                        const value = e.currentTarget.value
                        if(value[value.length-1]===' '){
                            tags.push(value.trim())
                            setTags(()=>[...tags])
                            e.currentTarget.value = ''
                        }
                    }}
                    placeholder={tags.length === 0 ? 'Add up to 4 tags...' : 'Add another'} />
                </div>
                <div className="flex text-sm items-center gap-x-2">
                    <button 
                    onClick={()=>{
                        updateContent('****',{s:2,e:2})
                    }}
                    className="border rounded p-2"><LuBold/></button>
                    <button 
                    onClick={()=>{
                        updateContent('__',{s:1,e:1})

                    }}
                    className="border rounded p-2"><LuItalic/></button>
                    <button 
                    onClick={()=>updateContent('[](url)',{s:3,e:6})}
                    className="border rounded p-2"><PiLinkSimple/></button>
                    <button
                    onClick={()=>updateContent('\n1. ',{s:3,e:3})}
                    className="border rounded p-2"><MdOutlineFormatListNumbered/></button>
                    <button
                    onClick={()=>
                        {
                            
                            updateContent('\n- ',{s:2,e:2})}
                        }
                    className="border rounded p-2"><MdOutlineFormatListBulleted/></button>
                    <button 
                    onClick={()=>updateContent('## ',{s:3,e:3})}
                    className="border rounded p-2"><LuHeading/></button>
                    <button
                    onClick={()=>updateContent('``',{s:1,e:1})}
                    className="border rounded p-2"><FaCode/></button>
                    <button
                    onClick={()=>updateContent('```\n\n```',{s:4,e:4})}
                    className="border rounded p-2"><BsCodeSquare/></button>
                    <div>
                        <input
                        ref={contentImageRef}
                        hidden type="file" accept="image/*" />
                        <button
                        onClick={()=>{
                            contentImageRef.current?.click()
                        }}
                        className="border rounded p-2"><FaImage/></button>
                    </div>

                </div>
                <div>
                    <textarea
                    ref={contentRef}
                    className="w-full p-2 h-[500px] border resize-none rounded text-sm" 
                    value={content}
                    onChange={(e)=>{
                        setContent(e.currentTarget.value)
                    }}
                    placeholder="write you post content here">
                    </textarea>
                </div>
            </div>
            <div className="text-sm flex gap-2">
                <button className="rounded p-2 hover:bg-blue-700 bg-blue-600 text-white">Publish</button>
                <button className="rounded p-2 ">Save draft</button>
            </div>
        </div>
    )
}