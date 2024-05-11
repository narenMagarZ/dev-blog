import Image from "next/image"


export default function Comment(){
    return(
        <div id="comment" className="flex flex-col gap-y-2">
            <h2 className="font-semibold text-xl">Comments</h2>
            <div className="flex gap-x-2">
                <Image src={'/dev-logo.png'} alt="" height={30} width={30} className="rounded-full h-[25px] w-[25px]" />
                <div className="w-full">
                    <textarea className="h-[150px] rounded-md p-2 outline-blue-700 border w-full resize-none" placeholder="Add to the discussion"></textarea>
                    <div className="flex gap-x-2">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-2 py-1" >Submit</button>
                        <button className="bg-gray-100 hover:bg-gray-200 rounded-md px-2 py-1" >Cancel</button>
                    </div>
                </div>
            </div>
            <div>
            </div>
        </div>
    )
}