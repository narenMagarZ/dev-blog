"use client"
import Link from "next/link"
import { IoMdNotificationsOutline } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import Image from "next/image";
export default function Compo(){
    const [showProfileCard,setShowProfileCard] = useState(false)
    const profileBtnRef = useRef<HTMLButtonElement>(null)
    useEffect(()=>{
      function handleClick(e:MouseEvent){
        if(profileBtnRef.current){
          if(profileBtnRef.current.isSameNode(e.target as HTMLButtonElement)){
            setShowProfileCard(true)
          }else setShowProfileCard(false)
        }
      }
      document.addEventListener('click',handleClick)
      return()=>{
        document.removeEventListener('click',handleClick)
      }
    },[])
    return(
        <div className="bg-white flex items-center justify-between p-2">
            <div className="flex gap-x-4">
            <Link href={'/'}>
                <Image src={'/dev-logo.png'}  alt="" height={45} width={50}/>
            </Link>
            <div className="test border w-80 py-1 text-sm rounded px-2 flex items-center">
                <input className="outline-none w-full" placeholder="search..."  />
                <button className="hover:text-[#2f3ab2] hover:bg-[#3B49DF1a] rounded-md p-1">
                <CiSearch size={18}/>
                </button>
            </div>
            </div>
            <div className="flex items-center gap-x-2">
            <Link 
            className="text-[#2f3ab2] hover:border-none border-[#2f3ab2] border hover:text-white hover:underline text-sm hover:bg-blue-600 p-2 rounded-md"
            href={'/new'}>Create post</Link>
            <Link
            className="hover:text-[#2F3AB2] hover:bg-[#3B49DF1a] rounded-md p-2"
            href={'/notifications'}><IoMdNotificationsOutline size={20}/></Link>
            <div className="">
                <button 
                ref={profileBtnRef}
                onClick={()=>setShowProfileCard(prev=>!prev)}
                className="p-4 bg-slate-500 rounded-full"></button>
                {
                showProfileCard && 
                <div className="z-50 absolute w-[200px] top-14 text-sm right-4 flex flex-col bg-white p-2 gap-y-1 border rounded">
                    <Link href={'/narenmagar'} 
                    className="rounded hover:underline px-2 py-2 flex flex-col hover:text-[#2F3AB2] hover:bg-[#3B49DF1a]"
                    >
                    <span className="">naren magar</span>
                    <span className="text-xs">@jrmartin</span>
                    </Link>
                    <Link 
                    className="rounded px-2 py-2 hover:text-[#2F3AB2] hover:bg-[#3B49DF1a]"
                    href={'/dashboard'}>Dashboard</Link>
                    <Link 
                    className="rounded px-2 py-2 hover:text-[#2F3AB2] hover:bg-[#3B49DF1a]"
                    href={'/new'}>Create Post</Link>
                    <Link
                    className="rounded px-2 py-2 hover:text-[#2F3AB2] hover:bg-[#3B49DF1a]"
                    href={'/readinglist'}>Reading list</Link>
                    <Link 
                    className="rounded px-2 py-2 hover:text-[#2F3AB2] hover:bg-[#3B49DF1a]"
                    href={'/settings'}>Settings</Link>
                    <button 
                    className="rounded text-left px-2 py-2 hover:text-[#2F3AB2] hover:bg-[#3B49DF1a]"
                    >Sign out</button>
                </div>
                }
            </div>
            </div>
        </div>
    )
}