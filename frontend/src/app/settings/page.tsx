


export default function Settings(){
    return(
        <div className="flex items-center justify-center">
            <div className="flex flex-col gap-y-3 p-4">
                <h3 className="font-bold text-xl"><span>@jrmartin</span></h3>
                <div className="p-4 bg-white rounded-md border w-[500px]">
                    <h3 className="mb-4 font-bold">User</h3>
                    <div className="text-sm flex flex-col gap-y-3">
                        <div className="flex flex-col gap-y-2">
                            <label>Name</label>
                            <input className="focus:outline-blue-600 p-2 rounded-md border"  />
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <label>Email</label>
                            <input className="focus:outline-blue-600 border p-2 rounded-md"  />
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <label>Name</label>
                            <input className="focus:outline-blue-600 border p-2 rounded-md" />
                        </div>
                    </div>
                </div>
                <div className="p-4 bg-white rounded-md border w-[500px]">
                    <h3 className="mb-4 font-bold">Basic</h3>
                    <div className="text-sm flex flex-col gap-y-3">
                        <div className="flex flex-col gap-y-2">
                            <label>Website URL</label>
                            <input 
                            placeholder="https://yoursite.com"
                            className="focus:outline-blue-600 p-2 rounded-md border"  />
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <label>Location</label>
                            <input className="focus:outline-blue-600 border p-2 rounded-md"  />
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <label>Bio</label>
                            <input className="focus:outline-blue-600 border p-2 rounded-md" />
                        </div>
                    </div>
                </div>
                <div className="p-4 bg-white rounded-md border w-[500px]">
                    <h3 className="mb-4 font-bold">Coding</h3>
                    <div className="text-sm flex flex-col gap-y-3">
                        <div className="flex flex-col gap-y-2">
                            <div>
                                <label>Currently learning</label>
                                <p className="text-gray-700">What are you learning right now? What are the new tools and languages you're picking up right now?</p>
                            </div>
                            <input 
                            placeholder="https://yoursite.com"
                            className="focus:outline-blue-600 p-2 rounded-md border"  />
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <div>
                                <label>Available for</label>
                                <p className="text-gray-700">What kinds of collaborations or discussions are you available for? What's a good reason to say Hey! to you these days?</p>
                            </div>
                            <input className="focus:outline-blue-600 border p-2 rounded-md"  />
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <div>
                                <label>Skill/Languages</label>
                                <p className="text-gray-700">What tools and languages are you most experienced with? Are you specialized or more of a generalist?</p>
                            </div>
                            <input className="focus:outline-blue-600 border p-2 rounded-md" />
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <div>
                                <label>Currently hacking on</label>
                                <p className="text-gray-700">What projects are currently occupying most of your time?</p>
                            </div>
                            <input className="focus:outline-blue-600 border p-2 rounded-md" />
                        </div>
                    </div>
                </div>
                <div className="p-4 bg-white rounded-md border w-[500px]">
                    <h3 className="mb-4 font-bold">Work</h3>
                    <div className="text-sm flex flex-col gap-y-3">
                        <div className="flex flex-col gap-y-2">
                            <label>Work</label>
                            <input 
                            placeholder="What do you do? Example: CEO at ACME Inc."
                            className="focus:outline-blue-600 p-2 rounded-md border"  />
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <label>Education</label>
                            <input placeholder="Where did you go to school?" className="focus:outline-blue-600 border p-2 rounded-md"  />
                        </div>
                    </div>
                </div>
                <div className="p-4 bg-white rounded-md border w-[500px]">
                    <h3 className="mb-4 font-bold">Branding</h3>
                    <div className="text-sm flex flex-col gap-y-3">
                        <div className="flex flex-col gap-y-2">
                            <div>
                                <label>Brand color</label>
                                <p>Used for backgrounds, borders,etc</p>
                            </div>
                            <div className="flex items-center border rounded-md p-1 gap-x-2">
                                <input type="color" className="rounded-md border-none outline-none" value='#ff0000' />
                                <input type="input" className="outline-none" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-4 bg-white rounded-md border w-[500px]">
                    <button className="text-white text-sm w-full p-2 rounded-md bg-blue-600 hover:bg-blue-700">Save Profile Information</button>
                </div>
            </div>
        </div>
    )
}