import ContentRow from "@/components/editor/row"

export default function ListContentRow({ rows = [], addRow, removeRow }){
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
