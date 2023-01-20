import Head from 'next/head'
import { useState } from 'react';
import { nanoid } from 'nanoid'
import ContentRow from '../components/content-row'
import SidebarContent from '../components/sidebar-content';
import TopbarContent from '../components/topbar-content';
import ContentTitle from '../components/content-title';
import { readImage } from '../lib/browser-file';
import { Transition } from '@headlessui/react';

const ListContentRow = ({ rows = [], addRow, removeRow }) => {
    return (
        <div className="content-rows">
            {rows.map(item => {
                return <ContentRow
                    key={item.id}
                    id={item.id}
                    text={item.text}
                    addRow={addRow}
                    removeRow={removeRow}
                />
            })}
        </div>
    )
}

export default function Home() {
    const [title, setTitle] = useState("Getting Started")
    const [pageIcon, updatePageIcon] = useState(null)
    const [rows, appendRow] = useState([
        { text: "👋 Welcome to Nocion!", id: nanoid() }
    ])
    const [isShowSidebar, setShowSidebar] = useState(true);

    const addRow = (value) => {
        if (value?.parentId) {
            return appendRow(prevRows => {
                const indexParentId = prevRows.findIndex(item => item.id === value.parentId)

                return [
                    ...prevRows.slice(0, indexParentId + 1),
                    ...[{ text: value?.text, id: nanoid() }],
                    ...prevRows.slice(indexParentId + 1, prevRows.length)
                ]
            })
        }

        if (value?.index === 0) {
            return appendRow(prevRows => {
                return [
                    ...[{ text: value?.text, id: nanoid() }],
                    ...prevRows
                ]
            })
        }

        return appendRow(prevRows => {
            return [
                ...prevRows,
                ...[{ text: value?.text, id: nanoid() }]
            ]
        })
    }

    const removeRow = (value) => {
        return appendRow(prevRows => {
            return [
                ...prevRows.filter(item => item.id !== value.id)
            ]
        })
    }

    const onSelectIcon = async (event) => {
        try {
            const file = event.target.files[0];
            const image = await readImage(file);
            updatePageIcon(image)
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div>
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
                <script defer data-domain="nocion.vercel.app" src="https://plausible.io/js/plausible.js"></script>
            </Head>
            <div className="flex w-full h-screen justify-between font-base overflow-y-hidden">
                <Transition
                    show={isShowSidebar}
                    enter="transition-all duration-300"
                    enterFrom="-ml-[250px]"
                    enterTo="ml-0"
                    leave="transition-all duration-300"
                    leaveFrom="-ml-0"
                    leaveTo="-ml-[250px]"
                >
                    <SidebarContent toggleSidebar={() => setShowSidebar(false)} />
                </Transition>
                <div className="w-full h-full overflow-y-scroll">
                    <TopbarContent isShowToggle={isShowSidebar} toggleSidebar={() => setShowSidebar(true)} title={title} onUpdateTitle={(text) => setTitle(text)} />
                    <div className="xl:w-[900px] md:w-[650px] px-16 mx-auto">
                        <div>
                            <div className="px-2 pt-[78px] group">
                                <div className="p-2 hover:bg-hover max-w-[140px] rounded cursor-pointer">
                                    <img src={pageIcon} className={`max-w-[125px] ${pageIcon ? 'h-[125px]' : 'h-[78px]'} object-cover`} />
                                </div>
                                <div className="pt-2 flex gap-2 invisible group-hover:visible">
                                    <div>
                                        <label htmlFor="content-icon" className="text-[#37352f81] text-sm p-1 flex items-center gap-2 rounded cursor-pointer hover:bg-hover" >
                                            <svg viewBox="0 0 14 14" className="w-4 h-4" fill="currentColor">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M7 0c3.861 0 7 3.139 7 7s-3.139 7-7 7-7-3.139-7-7 3.139-7 7-7zM3.561 5.295a1.027 1.027 0 1 0 2.054 0 1.027 1.027 0 0 0-2.054 0zm5.557 1.027a1.027 1.027 0 1 1 0-2.054 1.027 1.027 0 0 1 0 2.054zm1.211 2.816a.77.77 0 0 0-.124-1.087.786.786 0 0 0-1.098.107c-.273.407-1.16.958-2.254.958-1.093 0-1.981-.55-2.244-.945a.788.788 0 0 0-1.107-.135.786.786 0 0 0-.126 1.101c.55.734 1.81 1.542 3.477 1.542 1.668 0 2.848-.755 3.476-1.541z"></path>
                                            </svg>
                                            <span>Add Icon</span>
                                        </label>
                                        <input onChange={onSelectIcon} id="content-icon" type="file" className="input-file" />
                                    </div>
                                    <div>
                                        <p className="text-[#37352f81] text-sm p-1 flex items-center gap-2 rounded cursor-pointer hover:bg-hover" >
                                            <svg viewBox="0 0 14 14" className="w-4 h-4" fill="currentColor">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M2 0a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm0 12h10L8.5 5.5l-2 4-2-1.5L2 12z"></path>
                                            </svg>
                                            <span>Add Cover</span>
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[#37352f81] text-sm p-1 flex items-center gap-2 rounded cursor-pointer hover:bg-hover" >
                                            <svg viewBox="0 0 16 16" className="w-4 h-4" fill="currentColor">
                                                <path d="M4.095 15.465c.287 0 .499-.137.84-.444l2.523-2.277 4.47.007c2.058 0 3.214-1.19 3.214-3.22V4.22c0-2.03-1.156-3.22-3.213-3.22H3.213C1.163 1 0 2.19 0 4.22V9.53c0 2.037 1.196 3.22 3.165 3.213h.273v1.983c0 .45.24.738.657.738zM3.958 5.156a.454.454 0 01-.444-.45c0-.24.198-.438.444-.438h7.157c.246 0 .445.198.445.437a.45.45 0 01-.445.451H3.958zm0 2.256a.454.454 0 01-.444-.451c0-.24.198-.444.444-.444h7.157a.448.448 0 010 .895H3.958zm0 2.256a.448.448 0 010-.896h4.669c.246 0 .437.206.437.452a.438.438 0 01-.437.444H3.958z"></path>
                                            </svg>
                                            <span>Add Comment</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <ContentTitle addRow={addRow} text="Getting Started" />
                        </div>
                        <ListContentRow
                            rows={rows}
                            addRow={addRow}
                            removeRow={removeRow} />
                    </div>
                </div>
            </div>
        </div>
    )
}