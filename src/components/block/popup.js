import { nanoid } from "nanoid"

function MenuItem({ item, onSelectMenu }) {
    return (
        <div onClick={() => onSelectMenu()} className="hover:bg-hover p-2 cursor-pointer flex items-center gap-2">
            <img src="/icons/text-menu.png" className="w-12 h-12 border border-gray-200 rounded" />
            <div className="text-gray-600">
                <div className="text-[16px]">{item.name}</div>
                <div className="text-[14px] font-light">{item.description}</div>
            </div>
        </div>
    )
}

export default function PopupMenu({ isOpen, onSelectMenu }) {
    if (!isOpen) return null

    const items = [
        {
            "name": "Paragraph",
            "description": "Just start writing with plain text"
        },
        {
            "name": "Page",
            "description": "Embed sub-page inside this page"
        },
        {
            "name": "To-do list",
            "description": "Track task with a to-do list"
        },
        {
            "name": "Heading 1",
            "description": "Big section heading"
        },
        {
            "name": "Heading 2",
            "description": "Medium section heading"
        },
        {
            "name": "Heading 3",
            "description": "Small section heading"
        },
    ].map(item => ({...item, id: nanoid()}))

    return (
        <div className="absolute bottom-0">
            <div className="relative z-10">
                <div className="w-[350px] max-h-[400px] absolute top-0 rounded p-2 pb-1 px-0 bg-white shadow-lg border border-gray-200 overflow-y-auto">
                    <div className="uppercase px-2 text-[11px] text-gray-600">basic blocks</div>
                    <div className="py-2">
                        {items.map(item => <MenuItem key={item.id} item={item} onSelectMenu={onSelectMenu} />)}
                    </div>
                </div>
            </div>
        </div>
    )
}
