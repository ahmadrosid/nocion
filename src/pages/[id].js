import Head from 'next/head'
import { useState } from 'react';
import { nanoid } from 'nanoid'
import { readImage } from '@/lib/browser-file';
import { Transition } from '@headlessui/react';
import Editor from '@/components/editor/editor';
import SidebarContent from '@/components/content/sidebar';

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
                <Editor
                    isShowSidebar={isShowSidebar}
                    addRow={addRow}
                    removeRow={removeRow}
                    setTitle={setTitle}
                    onSelectIcon={onSelectIcon}
                    rows={rows}
                    pageIcon={pageIcon}
                    title={title}
                 />
            </div>
        </div>
    )
}