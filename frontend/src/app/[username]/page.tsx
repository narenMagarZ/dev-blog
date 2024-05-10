

export default function Username(){
    return(
        <div>
            <div className="bg-[#10339a] w-full h-[100px]"></div>
            <div className="w-full flex items-center justify-center mt-[-40px]">
                <div className="bg-white border w-[600px] rounded flex flex-col items-center relative gap-y-1 p-2">
                    <div className="">
                        <div className="mt-[-40px] text-center mb-4">
                            <button className="p-12 rounded-full bg-slate-200 border-4 border-[#10339a]"></button>
                        </div>
                        <button className="hover:bg-blue-700 right-2 top-2 absolute right-0 rounded text-sm text-white bg-blue-600 p-2">
                            Edit profile
                        </button>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="font-bold text-xl">naren magar</span>
                        <span>learner...</span>
                    </div>
                    <div className="flex items-center text-sm gap-x-2">
                        <div>
                            <span>
                                Surkhet, nepal
                            </span>
                            </div>
                        <div>
                            <span>Joined on mar 17, 2022</span>
                        </div>
                        <div>
                            <span>narenmagarz98@gmail.com</span>
                        </div>
                        <div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}