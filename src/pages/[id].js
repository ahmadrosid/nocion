import Head from 'next/head'
import { createRef, useEffect, useRef, useState } from 'react';
import { nanoid } from 'nanoid'
import ContentRow from '../components/content-row'
import SidebarContent from '../components/sidebar-content';
import TopbarContent from '../components/topbar-content';

const ContentTitle = ({ text, addRow }) => {
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

const ListContentRow = ({ rows = [], addRow, removeRow }) => {
    return (
        rows.map(item => {
            return <ContentRow
                key={item.id}
                id={item.id}
                text={item.text}
                addRow={addRow}
                removeRow={removeRow}
            />
        })
    )
}

export default function Home() {
    const [rows, appendRow] = useState([])

    useEffect(() => {
        if (rows.length == 0) {
            addRow({ text: "👋 Welcome to Nocion!", id: nanoid() })
        }
    }, [rows])

    const addRow = (value) => {
        const cloneRows = [...rows]
        console.log('added row', value, cloneRows)
        cloneRows.push({ ...value, id: nanoid() })
        appendRow(cloneRows)
    }

    const removeRow = (value) => {
        const cloneRows = rows.filter(item => item.id !== value.id)
        appendRow(cloneRows)
    }

    return (
        <div className="flex w-full h-screen justify-between font-base">
            <Head>
                <title>Getting Started</title>
                <link rel="icon" href="/favicon.ico" />
                <script defer data-domain="nocion.vercel.app" src="https://plausible.io/js/plausible.js"></script>
            </Head>

            <SidebarContent />

            <div className="w-full h-full">
                <TopbarContent title="Getting Started" />
                <div className="xl:w-[900px] md:w-[650px] px-16 mx-auto">
                    <ContentTitle addRow={addRow} text="Getting Started" />
                    <ListContentRow
                        rows={rows}
                        addRow={addRow}
                        removeRow={removeRow} />
                </div>
            </div>
        </div>
    )
}