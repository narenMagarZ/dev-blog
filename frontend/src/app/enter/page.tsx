"use client"

import {signIn} from 'next-auth/react'
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function Enter(){
    return(
        <div className='flex flex-col'>
            <button className='border-2' onClick={()=>{
                signIn('github')
            }}>Enter with <FaGithub/></button>
            <button 
            className='border-2'
            onClick={()=>{
                signIn('google')
            }}>Enter with <FcGoogle/></button>
        </div>
    )
}