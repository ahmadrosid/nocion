import { Transition } from '@headlessui/react'
import { Resizable } from 're-resizable'

export default function SidebarContent({ toggleSidebar, isShowSidebar }) {
    return (
        <div className='min-h-screen h-full w-[250px]'>
        {/*<Resizable
            minWidth={250}
            defaultSize={{
                width: 250,
                height: '100vh',
            }}>*/}

                <div className="relative z-0 w-full h-full bg-[#F7F6F3]">
                    <div className="px-4 py-2 hover:bg-[#E8E7E4] hover:cursor-pointer">
                        <div className="flex justify-between items-center gap-2 group relative">
                            <div className="flex gap-2 items-center">
                                <img src="/user.jpg" className="w-6 rounded" />
                                <p className="text-sm text-[#37352F] group-hover:ml-0 group-hover:relative truncate">Ahmad Rosid's Nocion</p>
                            </div>
                            <div onClick={toggleSidebar} className="transition-opacity duration-500 static right-0 group-hover:static ease-in-out text-[#3d3d3d] opacity-0 transform group-hover:block group-hover:opacity-100">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="px-4 py-2 hover:bg-[#E8E7E4] hover:cursor-pointer">
                        <div className="flex items-center gap-2 text-[#747474]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                            <span className="text-[14px] font-light">Quick find</span>
                        </div>
                    </div>
                    <div className="px-4 py-2 hover:bg-[#E8E7E4] hover:cursor-pointer">
                        <div className="flex items-center gap-2 text-[#747474]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-[14px] font-light">All Updates</span>
                        </div>
                    </div>
                    <div className="px-4 py-2 hover:bg-[#E8E7E4] hover:cursor-pointer mb-8">
                        <div className="flex items-center gap-2 text-[#747474]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="text-[14px] font-light">Settings and Members</span>
                        </div>
                    </div>
                    <ul className="py-2">
                        <li className="px-4 py-2 bg-[#E8E7E4]">
                            <div className="flex items-center gap-2">
                                <div className="text-[#A1A09C] hover:cursor-pointer">
                                    <svg viewBox="0 0 100 100" className="w-[0.6875em] h-[0.6875em] rotate-90" fill="currentColor" >
                                        <polygon points="5.9,88.2 50,11.8 94.1,88.2 "></polygon>
                                    </svg>
                                </div>
                                <div>
                                    <svg viewBox="0 0 30 30" className="w-[17.76px] h-[17.76px] text-[#A1A09C]" fill="currentColor">
                                        <g> <path d="M16,1H4v28h22V11L16,1z M16,3.828L23.172,11H16V3.828z M24,27H6V3h8v10h10V27z M8,17h14v-2H8V17z M8,21h14v-2H8V21z M8,25h14v-2H8V25z"></path> </g>
                                    </svg>
                                </div>
                                <div className="text-[#37352F] text-base">Getting started</div>
                            </div>
                        </li>
                    </ul>
                </div>
        {/* </Resizable> */}
        </div>
    )
}