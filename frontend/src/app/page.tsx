import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { FcLike } from "react-icons/fc";
import { FaRegComment } from "react-icons/fa6";
import SaveBtn from "./component/save-btn";
async function getArticles(){
  const res = await axios.get('http://localhost:5000/api/article')
  return res.data
}

const print = console.log
export default async function Page() {
  const articlesData = getArticles()
  const articles = await Promise.resolve(articlesData)
  print(articles)
  return (
    <main className="flex items-center justify-center">
      <Suspense fallback={<Loader/>} >
        <div className="flex flex-col gap-y-1">
        {
          articles.map((article:any,i:number)=>(
            <ArticleCard key={i}  {...article}  />
          ))
        }
        </div>
      </Suspense>
    </main>
  );
}

interface ArticleCardProps {
  id:string
  coverImage:string
  user:{
    username:string
    name:string
    image:string
    id:string
  }
  date:{
    postedDistanceFromNow:string,
    exactDateTime:string
  }
  title:string
  url:string
  tags:string[]
  likeCount:number
  commentCount:number
  durationToRead:string
  isSaved:boolean
}
function ArticleCard({
  id,
  coverImage,
  user,
  title,
  url,
  tags,
  durationToRead,
  likeCount,
  commentCount,
  isSaved,
  date
}:ArticleCardProps){
  return(
    <article
     className="w-[500px] flex flex-col bg-white rounded-md border">
      {
        coverImage && 
        <Image 
        className="w-full"
        src={coverImage} alt="article-cover-image" height={100} width={100} />
      }
      <div className="flex p-2 gap-x-1">
          <Link  className="" href={`/${user.username}`}>
            <Image className="rounded-full" src={user.image} alt="" height={30} width={30} />
          </Link>
          <div className=" w-full">
            <div className="flex flex-col">
              <div 
              style={{maxWidth:'fit-content'}}
              className="group relative cursor-pointer hover:bg-gray-100 rounded-md p-1">
                <span className="">{user.name}</span>
                <div className="absolute hidden group-hover:block  bg-white border overflow-hidden w-[200px] rounded-md z-50">
                    <div className={`h-[30px] bg-blue-500 w-full`}></div>
                    <div className="p-2 flex flex-col gap-y-2">
                      <Link href={'/'} className="mt-[-20px] flex items-center gap-x-2">
                          <Image className="border rounded-full" src={user.image} height={40} alt="cover-image" width={40} />
                          <span className="mt-2 font-semibold">{user.name}</span>
                      </Link>
                      <button className="bg-blue-600 hover:bg-blue-700 w-full text-white rounded p-1">Follow</button>
                      <p>bio</p>
                      <div>
                      </div>
                      <time dateTime=""></time>
                    </div>
                </div>
              </div>
              <time className="text-xs px-1" dateTime={date.exactDateTime} >{date.postedDistanceFromNow}</time>
            </div>
            <Link 
            className="block p-1 hover:text-[#2F3AB2] font-semibold text-xl" href={`/${url}`}>
              <span className="">{title}</span>
            </Link>
            <div className="text-sm flex items-center gap-x-1">
              {
                tags.map((tag,i)=>(
                  <Link 
                  className="border border-white hover:border-gray-200 hover:bg-gray-100 rounded-md px-2 py-1"
                  href={`/t/${tag}`} key={i}>#{tag}</Link>
                ))
              }
            </div>
            <div className=" flex items-cener gap-x-4">
              <Link className="flex gap-x-2 items-center hover:bg-gray-100 rounded-md px-2 py-1" href={`/${url}`}>
                <FcLike/>
                <span className="text-sm">{likeCount} reactions</span>
              </Link>
              <Link className="flex gap-x-2 items-center hover:bg-gray-100 rounded-md px-2 py-1" href={`/${url}/#comment`}>
                <FaRegComment/>
                <span className="text-sm">{commentCount} comments</span>
              </Link>
              <span className="flex-1"></span>
              <div className="flex items-center gap-x-2">
                <span className="text-xs">{durationToRead} min read</span>
                <SaveBtn aId={id} isSaved={isSaved} />
              </div>
            </div>
          </div>
      </div>
    </article>
  )
}

function Loader(){
  return(
    <div>
      loading
    </div>
  )
}


