import Head from 'next/head'
import { useState } from 'react';
import { nanoid } from 'nanoid'
import ContentRow from '../components/content-row'
import SidebarContent from '../components/sidebar-content';
import TopbarContent from '../components/topbar-content';
import ContentTitle from '../components/content-title';

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
    const [rows, appendRow] = useState([
        { text: "👋 Welcome to Nocion!", id: nanoid() }
    ])

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

    return (
        <div className="flex w-full h-screen justify-between font-base">
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
                <script defer data-domain="nocion.vercel.app" src="https://plausible.io/js/plausible.js"></script>
            </Head>

            <SidebarContent />

            <div className="w-full h-full">
                <TopbarContent title={title} onUpdateTitle={(text) => setTitle(text)} />
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