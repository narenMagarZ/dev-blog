"use client"
import axios from "axios"
import Link from "next/link"
import { SetStateAction, useEffect, useRef, useState } from "react"
import Image from 'next/image'
import { RxCross2 } from "react-icons/rx";
import { LuBold, LuItalic, LuHeading} from "react-icons/lu";
import { PiLinkSimple } from "react-icons/pi";
import { FaCode, FaImage } from "react-icons/fa6";
import { BsCodeSquare } from "react-icons/bs";
import parser from 'html-react-parser'
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

    const [title,setTitle] = useState('')
    const [content,setContent] = useState('')
    const [tags,setTags] = useState<any[]>([])
    const [coverImage,setCoverImage] = useState('')

    const [isEditing,setIsEditing] = useState(true)

    return(
        <div className="flex items-center flex-col gap-y-2 justify-center">
            <div className="text-sm text-right w-[500px]">
                <button 
                onClick={()=>setIsEditing(true)}
                className="hover:text-[#2f3ab2] hover:bg-[#3B49DF1a] px-2 py-1 rounded-md ">Edit</button>
                <button 
                onClick={()=>setIsEditing(false)}
                className="hover:text-[#2f3ab2] hover:bg-[#3B49DF1a] px-2 py-1 rounded-md ">Preview</button>
            </div>
            {
                isEditing ? <EditArticle 
                title={title}
                content={content}
                setContent={setContent}
                coverImage={coverImage}
                setCoverImage={setCoverImage}
                tags={tags}
                setTags={setTags}
                setTitle={setTitle}
                /> : <PreviewArticle 
                title={title}
                content={content}
                coverImage={coverImage}
                tags={tags}
                />
            }
            <div className="text-sm flex gap-2 w-[500px]">
                <button 
                onClick={()=>{
                    axios.post('http://localhost:5000/api/article',{
                        title,
                        tags:tags.toString(),
                        content,
                        coverImage,
                        state:'publish'
                    })
                    .then(res=>{}).catch(error=>{
                        console.error(error)
                    }).catch(error=>{
                        console.error(error)
                    })
                }}
                className="rounded p-2 hover:bg-blue-700 bg-blue-600 text-white">Publish</button>
                <button 
                onClick={()=>{
                    const formData = new FormData()
                    formData.append('cover-image',coverImage)
                    formData.append('title',title)
                    formData.append('tags',tags.toString())
                    formData.append('content',content)
                    formData.append('state','draft')
                    axios.post('http://localhost:5000/api/article',formData)
                    .then(res=>{})
                    .catch(error=>{
                        console.error(error)
                        })
                    }}
                className="rounded p-2 hover:text-[#2f3ab2] hover:bg-[#3B49DF1a]">Save draft</button>
            </div>
        </div>
    )
}


function EditArticle({
    content,
    coverImage,
    setCoverImage,
    title,
    setTitle,
    tags,
    setTags,
    setContent
}:{
    content:string
    setContent:React.Dispatch<SetStateAction<string>>
    title:string
    coverImage:string
    tags:string[]
    setCoverImage:React.Dispatch<SetStateAction<string>>
    setTitle:React.Dispatch<SetStateAction<string>>
    setTags:React.Dispatch<SetStateAction<string[]>>

}){
    const coverImageRef = useRef<HTMLInputElement>(null)
    const contentImageRef = useRef<HTMLInputElement>(null)
    const contentRef = useRef<HTMLTextAreaElement>(null)
    const [cursorPos,setCursorPos] = useState({s:0,e:0})
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
        <div className="flex bg-white rounded-md flex-col px-2 gap-y-2 w-[500px]">
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
                        onClick={()=>{
                            setCoverImage('')
                        }}
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
            className="px-2 mt-2 text-sm py-1 border rounded-md hover:bg-gray-100"
            onClick={()=>{
                coverImageRef.current?.click()
            }}
            >Add a cover image</button>
        </div>
        <div>
            <input 
            className="text-lg font-bold outline-none w-full px-2 py-1"
            value={title}
            onChange={(e)=>{
                setTitle(e.currentTarget.value)
            }}
            placeholder="New post title here..." />
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
                            className="hover:text-red-500"
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
            className="text-sm px-2 py-1 outline-none"
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
        <div className="flex text-sm items-center gap-x-2 bg-gray-100 rounded p-1">
            <button 
            className="rounded p-2 hover:text-[#2f3ab2] hover:bg-[#3B49DF1a]"
            onClick={()=>{
                updateContent('****',{s:2,e:2})
            }}
            ><LuBold/></button>
            <button 
            onClick={()=>{
                updateContent('__',{s:1,e:1})

            }}
            className="rounded p-2 hover:text-[#2f3ab2] hover:bg-[#3B49DF1a]"><LuItalic/></button>
            <button 
            onClick={()=>updateContent('[](url)',{s:3,e:6})}
            className="rounded p-2 hover:text-[#2f3ab2] hover:bg-[#3B49DF1a]"><PiLinkSimple/></button>
            <button
            onClick={()=>updateContent('\n1. ',{s:3,e:3})}
            className="rounded p-2 hover:text-[#2f3ab2] hover:bg-[#3B49DF1a]"><MdOutlineFormatListNumbered/></button>
            <button
            onClick={()=>
                {
                    
                    updateContent('\n- ',{s:2,e:2})}
                }
            className="rounded p-2 hover:text-[#2f3ab2] hover:bg-[#3B49DF1a]"><MdOutlineFormatListBulleted/></button>
            <button 
            onClick={()=>updateContent('## ',{s:3,e:3})}
            className="rounded p-2 hover:text-[#2f3ab2] hover:bg-[#3B49DF1a]"><LuHeading/></button>
            <button
            onClick={()=>updateContent('``',{s:1,e:1})}
            className="rounded p-2 hover:text-[#2f3ab2] hover:bg-[#3B49DF1a]"><FaCode/></button>
            <button
            onClick={()=>updateContent('```\n\n```',{s:4,e:4})}
            className="rounded p-2 hover:text-[#2f3ab2] hover:bg-[#3B49DF1a]"><BsCodeSquare/></button>
            <div>
                <input
                ref={contentImageRef}
                hidden type="file" accept="image/*" />
                <button
                onClick={()=>{
                    contentImageRef.current?.click()
                }}
                className="rounded p-2 hover:text-[#2f3ab2] hover:bg-[#3B49DF1a]"><FaImage/></button>
            </div>

        </div>
        <div>
            <textarea
            ref={contentRef}
            className="w-full outline-none p-2 h-[500px] resize-none rounded text-sm" 
            value={content}
            onChange={(e)=>{
                setContent(e.currentTarget.value)
            }}
            placeholder="write you post content here">
            </textarea>
        </div>
    </div>
    )
}

function apiCall(endPoint:string,method:string,data?:any){
    return Promise.resolve(axios(`http://localhost:5000/api/article/${endPoint}`,{
        method,
        data
    }))

}
function PreviewArticle(article:{
    title:string
    coverImage:string
    tags:string[]
    content:string
}){
    const [htmlDoc,setHtmlDoc] = useState('')
    useEffect(()=>{
        apiCall('preview','POST',{content:article.content}).then(res=>{
            if(res.status===200){
                setHtmlDoc(res.data.processedHTML)
            }
        }).catch(err=>{
            console.error(err)
        })
    },[])
    return(
        <div className="bg-white p-4 rounded-md overflow-auto h-[650px] w-[500px]">
            {
                article.coverImage && 
                <Image src={article.coverImage} alt="article cover image" height={100} width={100}  />
            }
            <div>
                <h1 className="font-bold text-lg">{article.title}</h1>
                <div className="flex items-center gap-x-1">
                    {
                        article.tags.map((tag,i)=>(
                            <Link href={`/t/${tag}`}
                            className="rounded-md hover:bg-gray-100 border border-white hover:border-gray-200 px-2 py-1 text-sm"
                            key={i}>#{tag}</Link>
                        ))
                    }
                </div>
                <div style={{whiteSpace:'pre-wrap'}}>
                    {parser(htmlDoc)}
                </div>
            </div>
        </div>
    )
}