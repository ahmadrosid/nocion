import Head from 'next/head'
import { Resizable } from 're-resizable'
import React, { useEffect, useState, useRef } from 'react';

const EditableElement = (props) => {
    const { onChange } = props;
    const element = useRef();
    let elements = React.Children.toArray(props.children);

    if (elements.length > 1) {
        throw Error("Can't have more than one child");
    }

    const onMouseUp = () => {
        const value = element.current?.value || element.current?.innerText;
        onChange(value);
    };

    useEffect(() => {
        const value = element.current?.value || element.current?.innerText;
        onChange(value);
    }, []);

    elements = React.cloneElement(elements[0], {
        contentEditable: true,
        suppressContentEditableWarning: true,
        ref: element,
        onKeyUp: onMouseUp
    });
    return elements;
};

const ContentTitle = ({ text, onEnter }) => {
    const targetKey = "Enter";


    function downHandler({ key }) {
        // console.log("downHandler", key)
        // if (key === targetKey) {
        // }
    }

    const upHandler = ({ key }) => {
        if (key === targetKey) {
            onEnter({ text: "empty value" })
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", downHandler);
        window.addEventListener("keyup", upHandler);
        return () => {
            window.removeEventListener("keydown", downHandler);
            window.removeEventListener("keyup", upHandler);
        };
    }, []);

    const handleOnChange = (value) => {
        console.log('on change')
    }

    return (
        <EditableElement onChange={handleOnChange}>
            <div className="text-[#37352F] font-bold text-3xl p-2 focus:outline-none">{text}</div>
        </EditableElement>
    )
}

const ContentRow = ({ text }) => {
    const contentRef = useRef()

    const handleOnFocus = () => {
        console.log("is focusing", contentRef.current.innerText.length)
        if (contentRef.current.innerText.length == 0) {
            contentRef.current.setAttribute('placeholder', "Type '/' for commands")
        }
    }

    const handleOnBlur = () => {
        console.log("handleOnBlur", contentRef.current.innerText.length)
        if (contentRef.current.innerText.length == 0) {
            contentRef.current.setAttribute('placeholder', '')
        }
    }

    const handleOnUp = ({ key }) => {
        const { innerText } = contentRef.current
        console.log(contentRef.current)
        console.log('is handleOnUp', key, `'${innerText}'`, innerText.length)
        if (key == 'Backspace' && innerText === '' || innerText == '\n' || innerText.length == 0) {
            if (document.activeElement !== contentRef.current) {
                contentRef.current.setAttribute('placeholder', '')
                return;
            }
            contentRef.current.setAttribute('placeholder', "Type '/' for commands")
        } else {
            contentRef.current.setAttribute('placeholder', '')
        }
    }

    const handleOnDown = ({ key }) => {
        const { innerText } = contentRef.current
        console.log('is handleOnDown', key, innerText.length)
        if (key == 'Backspace' && innerText === '' || innerText.length == 0) {
            if (document.activeElement !== contentRef.current) {
                contentRef.current.setAttribute('placeholder', '')
                return;
            }
            contentRef.current.setAttribute('placeholder', "Type '/' for commands")
        } else {
            contentRef.current.setAttribute('placeholder', '')
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
        <div className="flex items-center relative group">
            <div className="-left-8 top-0 pt-[7px] absolute flex items-center">
                <div className="hover:bg-gray-200 group-hover:block hidden transition-all rounded cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className="hover:bg-gray-200 group-hover:block hidden py-1 rounded grabbable">
                    <svg className="w-4 text-gray-300" fill="currentColor" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3,2 C2.44771525,2 2,1.55228475 2,1 C2,0.44771525 2.44771525,0 3,0 C3.55228475,0 4,0.44771525 4,1 C4,1.55228475 3.55228475,2 3,2 Z M3,6 C2.44771525,6 2,5.55228475 2,5 C2,4.44771525 2.44771525,4 3,4 C3.55228475,4 4,4.44771525 4,5 C4,5.55228475 3.55228475,6 3,6 Z M3,10 C2.44771525,10 2,9.55228475 2,9 C2,8.44771525 2.44771525,8 3,8 C3.55228475,8 4,8.44771525 4,9 C4,9.55228475 3.55228475,10 3,10 Z M7,2 C6.44771525,2 6,1.55228475 6,1 C6,0.44771525 6.44771525,0 7,0 C7.55228475,0 8,0.44771525 8,1 C8,1.55228475 7.55228475,2 7,2 Z M7,6 C6.44771525,6 6,5.55228475 6,5 C6,4.44771525 6.44771525,4 7,4 C7.55228475,4 8,4.44771525 8,5 C8,5.55228475 7.55228475,6 7,6 Z M7,10 C6.44771525,10 6,9.55228475 6,9 C6,8.44771525 6.44771525,8 7,8 C7.55228475,8 8,8.44771525 8,9 C8,9.55228475 7.55228475,10 7,10 Z"></path>
                    </svg>
                </div>
            </div>
            <div
                ref={contentRef}
                className="block-editor text-gray-700 text-lg focus:outline-none px-2 py-1 w-full"
                onFocus={handleOnFocus}
                onBlur={handleOnBlur}
                suppressContentEditableWarning={true}
                contentEditable={true}
                spellCheck={true}>
                {text}
            </div>
        </div>
    )
}

export default function Home() {
    const [rows, appendRow] = useState([])

    useEffect(() => {
        if (rows.length == 0) {
            addRow({ text: "" })
        }
    }, [])

    const addRow = (value) => {
        rows.push({ ...value, id: rows.length + 1 })
        appendRow(rows)
    }

    return (
        <div className="flex w-full h-screen justify-between font-mono">
            <Head>
                <title>Getting Started - Noicon</title>
                <link rel="icon" href="/favicon.ico" />
                <script defer data-domain="nocion.vercel.app" src="https://plausible.io/js/plausible.js"></script>
            </Head>
            <Resizable
                minWidth={248}
                defaultSize={{
                    width: 248,
                    height: '100%',
                }}
            >
                <div className="w-full h-full bg-[#F7F6F3]">
                    <div className="px-4 py-2 hover:bg-[#E8E7E4] hover:cursor-pointer">
                        <div className="flex items-center gap-2 group relative">
                            <img src="https://www.ahmadrosid.com/profile.png" className="w-8" />
                            <p className="text-sm text-[#37352F] fixed ml-10 group-hover:ml-0 group-hover:relative group-hover:truncate">Ahmad Rosid's Noiton</p>
                            <span className="transition-opacity duration-500 absolute right-0 group-hover:relative ease-in-out text-[#3d3d3d] opacity-0 transform group-hover:block group-hover:opacity-100">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                </svg>
                            </span>
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
                            <p className="flex items-center gap-2">
                                <span className="text-[#A1A09C] hover:cursor-pointer">
                                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16.1056 9.55279C16.4741 9.73705 16.4741 10.263 16.1056 10.4472L3.72361 16.6382C3.39116 16.8044 3 16.5627 3 16.191L3 3.80902C3 3.43733 3.39116 3.19558 3.72361 3.3618L16.1056 9.55279Z" />
                                    </svg>
                                </span>
                                <span className="text-[#37352F]  text-base">Getting started</span>
                            </p>
                        </li>
                    </ul>
                </div>
            </Resizable>
            <div className="w-full h-full p-8">
                <div className="w-[900px] px-8 mx-auto">
                    <ContentTitle text="Getting Started" onEnter={addRow} />
                    {React.Children.toArray(
                        rows.map(item => (
                            <ContentRow text={item.text} />
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}