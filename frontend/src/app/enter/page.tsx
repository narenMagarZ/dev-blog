"use client"
import Link from 'next/link';
import Image from 'next/image';
import {signIn} from 'next-auth/react'
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function Enter(){
    return(
        <div className='flex flex-col items-center gap-y-2 justify-center'>
            <div className='flex gap-y-2 mb-2 justify-center b flex-col items-center'>
                <Link href={'/'}>
                    <Image src={'/dev-logo.png'}  alt="" height={45} width={50}/>
                </Link>
                <div className='text-center'>
                    <h1 className='font-bold text-xl'>Join the Dev Community</h1>
                    <p className='text-sm'>DEV Community is a community of more than thousand amazing developers</p>
                </div>
            </div>
            <button className='border text-sm hover:bg-gray-100  p-2 gap-y-1 flex items-center bg-white w-[500px] border rounded-md p-2' onClick={()=>{
                signIn('github')
            }}>
                <FaGithub size={20}/>
                <span className='flex-1'>
                    Enter with Github
                </span>
                </button>
            <button 
            className='border text-sm hover:bg-gray-100 p-2 gap-y-1 flex items-center w-[500px] bg-white border rounded-md'
            onClick={()=>{
                signIn('google')
            }}>
                <FcGoogle size={20}/>
                <span className='flex-1'>
                    Enter with Google
                </span>
            </button>
        </div>
    )
}