import { useEffect, useRef } from "react"
import { selectLastNode } from "../lib/utils"

export default function ContentTitle({ text, addRow }){
    const contentRef = useRef()

    const handleOnUp = (event) => {
        const { key } = event
        if (!contentRef?.current?.innerText) {
            return
        }

        if (key == 'Enter' && document.activeElement === contentRef.current) {
            if (!event.shiftKey) {
                addRow({ text: '' })
            } else {
                contentRef.current.innerText = contentRef.current.innerText + "\n"
                selectLastNode(contentRef.current) 
            }
        }
    }

    const handleOnDown = (event) => {
        // TODO: handle something
        const { key } = event
        if (key == 'Enter' && document.activeElement === contentRef.current) {
            event.preventDefault()
        }
    }

    useEffect(() => {
        window.addEventListener("keyup", handleOnUp);
        window.addEventListener("keydown", handleOnDown);
        return () => {
            window.removeEventListener("keyup", handleOnUp);
            window.removeEventListener("keydown", handleOnDown);
        };
    }, []);

    return (
        <div
            ref={contentRef}
            suppressContentEditableWarning={true}
            contentEditable={true}
            className="text-[#37352F] font-bold text-[40px] p-2 focus:outline-none">
            {text}
        </div>
    )
}
