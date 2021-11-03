import { useRef, useState } from "react";
import useOnClickOutside from "../lib/hooks/useOnClickOutside";

export default function TopbarContent({ title }) {
    const refTitleContainer = useRef()
    const refTitle = useRef()
    const [contentTitle, setContentTitle] = useState(title)
    const [showEditTitle, setShowEditTitle] = useState(false)

    useOnClickOutside(refTitleContainer, () => setShowEditTitle(false))

    const handleUpdateTitle = (e) => {
        setShowEditTitle(!showEditTitle)
        e.preventDefault();
    }

    const handleSubmitUpdateTitle = (e) => {
        setContentTitle(e.target.title.value)
        setShowEditTitle(false)
        e.preventDefault();
    }

    return (
        <div className="p-2 flex justify-between">
            <div className="relative" ref={refTitleContainer} >
                <div onClick={handleUpdateTitle} ref={refTitle} className="hover:bg-hover px-2 py-1 rounded-md cursor-pointer">{contentTitle}</div>
                {showEditTitle && (
                    <div className="bg-white rounded shadow-lg py-1 px-2 border border-[#dadada] flex items-center gap-2 absolute -left-full w-[350px]">
                        <div className="border border-[#dadada] px-1.5 py-1 rounded">
                            <img src="/user.jpg" className="w-6 rounded" />
                        </div>
                        <form onSubmit={handleSubmitUpdateTitle} className="w-full">
                            <input name="title" className="text-sm w-full max-w-[400px] bg-gray-1 rounded px-1.5 py-1 border border-[#dadada] focus:outline-none" type="text" defaultValue={contentTitle} />
                        </form>
                    </div>
                )}
            </div>
            <div className="flex items-center gap-1">
                <div className="hover:bg-hover px-2 py-1 rounded-md cursor-pointer">Share</div>
                <div className="text-gray-600 hover:bg-hover cursor-pointer p-1 px-1.5 rounded">
                    <svg viewBox="0 0 20 20" className="w-5 h-5" fill="currentColor">
                        <path d="M5.9375 18.4844C6.38281 18.4844 6.71094 18.2656 7.25 17.7891L9.92969 15.4297H14.6328C16.9844 15.4297 18.3047 14.0703 18.3047 11.75V5.67969C18.3047 3.35938 16.9844 2 14.6328 2H4.67188C2.32812 2 1 3.35938 1 5.67969V11.75C1 14.0781 2.36719 15.4297 4.61719 15.4297H4.9375V17.3438C4.9375 18.0391 5.30469 18.4844 5.9375 18.4844ZM6.32812 16.7344V14.5078C6.32812 14.0469 6.125 13.8672 5.6875 13.8672H4.72656C3.25781 13.8672 2.55469 13.125 2.55469 11.7031V5.72656C2.55469 4.30469 3.25781 3.5625 4.72656 3.5625H14.5859C16.0469 3.5625 16.75 4.30469 16.75 5.72656V11.7031C16.75 13.125 16.0469 13.8672 14.5859 13.8672H9.84375C9.36719 13.8672 9.13281 13.9453 8.80469 14.2891L6.32812 16.7344ZM5.67969 6.82812H13.5469C13.8125 6.82812 14.0312 6.60156 14.0312 6.32812C14.0312 6.07031 13.8125 5.85156 13.5469 5.85156H5.67969C5.41406 5.85156 5.20312 6.07031 5.20312 6.32812C5.20312 6.60156 5.41406 6.82812 5.67969 6.82812ZM5.67969 9.30469H13.5469C13.8125 9.30469 14.0312 9.08594 14.0312 8.8125C14.0312 8.55469 13.8125 8.32812 13.5469 8.32812H5.67969C5.41406 8.32812 5.20312 8.55469 5.20312 8.8125C5.20312 9.08594 5.41406 9.30469 5.67969 9.30469ZM5.67969 11.7891H10.8047C11.0781 11.7891 11.2891 11.5703 11.2891 11.3047C11.2891 11.0312 11.0781 10.8125 10.8047 10.8125H5.67969C5.41406 10.8125 5.20312 11.0312 5.20312 11.3047C5.20312 11.5703 5.41406 11.7891 5.67969 11.7891Z"></path>
                    </svg>
                </div>
                <div className="text-gray-600 hover:bg-hover cursor-pointer p-1 px-1.5 rounded">
                    <svg viewBox="0 0 20 20" className="w-5 h-5" fill="currentColor">
                        <path d="M10.0781 18.1562C14.5078 18.1562 18.1641 14.5 18.1641 10.0781C18.1641 5.65625 14.5 2 10.0703 2C5.64844 2 2 5.65625 2 10.0781C2 14.5 5.65625 18.1562 10.0781 18.1562ZM10.0781 16.5469C6.49219 16.5469 3.625 13.6641 3.625 10.0781C3.625 6.49219 6.49219 3.61719 10.0703 3.61719C13.6562 3.61719 16.5391 6.49219 16.5469 10.0781C16.5547 13.6641 13.6641 16.5469 10.0781 16.5469ZM6.14062 11.0625H10.0703C10.4297 11.0625 10.7031 10.7891 10.7031 10.4375V5.32812C10.7031 4.97656 10.4297 4.70312 10.0703 4.70312C9.72656 4.70312 9.45312 4.97656 9.45312 5.32812V9.8125H6.14062C5.78906 9.8125 5.51562 10.0859 5.51562 10.4375C5.51562 10.7891 5.78906 11.0625 6.14062 11.0625Z"></path>
                    </svg>
                </div>
                <div className="text-yellow-600 hover:bg-hover cursor-pointer p-1 px-1.5 rounded">
                    <svg viewBox="0 0 20 20" className="w-5 h-5" fill="currentColor"><path d="M4.77321 18.0645C5.14821 18.3457 5.60915 18.252 6.1404 17.8691L10.2029 14.8848L14.2576 17.8691C14.7888 18.252 15.2498 18.3457 15.6248 18.0645C15.992 17.7832 16.0701 17.3223 15.8591 16.7051L14.2576 11.9395L18.3513 9.00195C18.8826 8.62695 19.1013 8.20508 18.9529 7.76758C18.8045 7.33008 18.3904 7.11133 17.7341 7.11914L12.7185 7.1582L11.1873 2.36133C10.9841 1.73633 10.6638 1.40039 10.2029 1.40039C9.73415 1.40039 9.41383 1.73633 9.21071 2.36133L7.68727 7.1582L2.66383 7.11914C2.00758 7.11133 1.59352 7.33008 1.44508 7.75977C1.29665 8.20508 1.52321 8.62695 2.04665 9.00195L6.1404 11.9395L4.53883 16.7051C4.3279 17.3223 4.40602 17.7832 4.77321 18.0645Z"></path>
                    </svg>
                </div>
                <div className="text-gray-600 hover:bg-hover cursor-pointer p-1 px-1.5 rounded">
                    <svg viewBox="0 0 13 3" className="w-5 h-5" fill="currentColor"><g> <path d="M3,1.5A1.5,1.5,0,1,1,1.5,0,1.5,1.5,0,0,1,3,1.5Z"></path> <path d="M8,1.5A1.5,1.5,0,1,1,6.5,0,1.5,1.5,0,0,1,8,1.5Z"></path> <path d="M13,1.5A1.5,1.5,0,1,1,11.5,0,1.5,1.5,0,0,1,13,1.5Z"></path> </g>
                    </svg>
                </div>
            </div>
        </div>
    )
}
