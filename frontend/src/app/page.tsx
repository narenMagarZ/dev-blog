import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { FcLike } from "react-icons/fc";
import { FaRegComment } from "react-icons/fa6";
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
    name:string
    image:string
    id:string
  }
  userUrl:string
  postedAt:string
  title:string
  articleUrl:string
  tags:string[]
  reactions:string
  comments:string
  durationToRead:string
  isSaved:string
}
function ArticleCard({
  id,
  coverImage,
  user,
  userUrl,
  postedAt,
  title,
  articleUrl,
  tags,
  durationToRead,
  reactions,
  comments,
  isSaved
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
          <Link  className="" href={``}>
            <Image className="rounded-full" src={user.image} alt="" height={30} width={30} />
          </Link>
          <div className=" w-full">
            <div>
              <span>{user.name}</span>
              <span>{postedAt}</span>
            </div>
            <Link className="hover:text-[#2F3AB2] font-semibold text-xl" href={''}>{title}</Link>
            <div className="text-sm flex items-center gap-x-1">
              {
                tags.map((tag,i)=>(
                  <Link 
                  className="border border-white hover:border-gray-200 hover:bg-gray-100 rounded-md px-2 py-1"
                  href={`/${tag}`} key={i}>#{tag}</Link>
                ))
              }
            </div>
            <div className=" flex items-cener gap-x-4">
              <Link className="flex gap-x-2 items-center hover:bg-gray-100 rounded-md px-2 py-1" href={'/'}>
                <FcLike/>
                <span className="text-sm">9 reactions</span>
              </Link>
              <Link className="flex gap-x-2 items-center hover:bg-gray-100 rounded-md px-2 py-1" href={'/'}>
                <FaRegComment/>
                <span className="text-sm">9 comments</span>
              </Link>
              <span className="flex-1"></span>
              <div className="flex items-center gap-x-2">
                <span className="text-xs">13 min read</span>
                <button className="p-1 hover:text-[#2F3AB2] hover:bg-[#3B49DF1a] rounded-md ">
                  <Save/>
                </button>
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


function Save(){
  return(
  <svg
  width="24" height="24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path className="" d="M6.75 4.5h10.5a.75.75 0 01.75.75v14.357a.375.375 0 01-.575.318L12 16.523l-5.426 3.401A.375.375 0 016 19.607V5.25a.75.75 0 01.75-.75zM16.5 6h-9v11.574l4.5-2.82 4.5 2.82V6z"></path></svg>
  )
}