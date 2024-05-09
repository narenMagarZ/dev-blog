import Link from "next/link"
import { IoMdNotificationsOutline } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import Image from "next/image";
export default function Navbar(){
    return(
        <nav className="flex items-center justify-between p-2">
        <div className="flex gap-x-4">
          <Link href={'/'}>
            <Image src={'/dev-logo.png'}  alt="" height={45} width={50}/>
          </Link>
          <div className="border w-80 py-1 text-sm rounded px-2 flex items-center">
            <input className="outline-none w-full" placeholder="search..."  />
            <button>
              <CiSearch/>
            </button>
          </div>
        </div>
        <div className="flex items-center gap-x-2">
          <Link href={'/new'}>Create post</Link>
          <Link href={'/notifications'}><IoMdNotificationsOutline/></Link>
          <div className="">
            <button className="p-4 bg-slate-500 rounded-full"></button>
            <div className="absolute right-4 flex flex-col bg-white p-4 gap-y-4 border rounded">
              <Link href={'/narenmagar'} className="flex flex-col">
                <span>naren magar</span>
                <span className="text-xs">@jrmartin</span>
              </Link>
              <Link href={'/dashboard'}>Dashboard</Link>
              <Link href={'/new'}>Create Post</Link>
              <Link href={'/readinglist'}>Reading list</Link>
              <Link href={'/settings'}>Settings</Link>
              <button className="text-left">Sign out</button>
            </div>
          </div>
        </div>
      </nav>
    )
}