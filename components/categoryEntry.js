import GBP from "@/helpers/gbp"

const categoryEntry = ({ entry, entries, setEntries, expired, index }) => {

    const removeEntry = (entry) => {
        setEntries(old => {
            return old.filter(e => e.id !== entry.id)
        })
    }
    return (
        <div key={entry.id} className={`categoryEntry ${expired ? "expired" : ""} ${(index < entries.length - 1) ? "bottomBorder" : ""}`} >
            <button className="closeButton" onClick={() => removeEntry(entry)}></button>
            <div className="heading">{entry.date}</div>
            <div className="money">{GBP.format(entry.value)}</div>
            <div className="subCat">{entry.subCategory ? ` ${entry.subCategory}` : '-'}</div>
            <div className="note">{entry.note ? `${entry.note}` : '-'}</div>
        </div>
    )
}

export default categoryEntry