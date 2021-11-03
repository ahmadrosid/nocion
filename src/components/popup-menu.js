import { nanoid } from "nanoid"

function MenuItem({ onSelectMenu }) {
    return (
        <div onClick={() => onSelectMenu()} className="hover:bg-hover p-2 cursor-pointer flex items-center gap-2">
            <img src="/icons/text-menu.png" className="w-12 h-12 border border-gray-200 rounded" />
            <div className="text-gray-600">
                <div className="text-[16px]">Text</div>
                <div className="text-[14px] font-light">Just start writing with plain text.</div>
            </div>
        </div>
    )
}

export default function PopupMenu({ isOpen, onSelectMenu }) {
    if (!isOpen) return null

    return (
        <div className="absolute bottom-0">
            <div className="relative z-10">
                <div className="w-[350px] max-h-[400px] absolute top-0 rounded p-2 pb-1 px-0 bg-white shadow-lg border border-gray-200 overflow-y-auto">
                    <div className="uppercase px-2 text-[11px] text-gray-600">basic blocks</div>
                    <div className="py-2">
                        {Array(8).fill().map(() => <MenuItem key={nanoid()} onSelectMenu={onSelectMenu} />)}
                    </div>
                </div>

            </div>
        </div>
    )
}
