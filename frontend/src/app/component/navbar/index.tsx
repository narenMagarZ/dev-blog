
import {getServerSession} from 'next-auth/next'
import Compo from './compo'
export default async function Navbar(){
  const session = await getServerSession()
  console.log(session)

    return(
        <nav className="">
            <Compo/>
      </nav>
    )
}