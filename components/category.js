import CategoryEntry from "./categoryEntry"
import GBP from "@/helpers/gbp"
import { useEffect, useState } from "react"

const Category = ({ category, entries, setEntries, monthEntries, showOldEntries }) => {

    const [totalMoney, setTotalMoney] = useState(0)
    const [dateOrdered, setDateOrdered] = useState([])

    useEffect(() => {
        let newtotal = 0
        entries.forEach(i => { newtotal += i.value })
        setTotalMoney(newtotal)

        let orderedList = entries.sort((a, b) => {
            if (a.date > b.date) return -1;
            if (a.date < b.date) return 1;
            return 0;
        })

        setDateOrdered(orderedList)
    }, [entries])

    return (
        <div style={{ backgroundColor: `${category.color}` }} className={`category ${category.out ? "out" : "in"}`}>
            <div className="heading" ><span>{category.name}</span><span>{GBP.format(totalMoney)}</span></div>
            <div className="body" >
                {dateOrdered.map((entry, index) => {
                    let expired = false
                    if (!monthEntries.find(({ id }) => id == entry.id)) expired = true

                    return (
                        <>
                            {!(expired && !showOldEntries) &&
                                <CategoryEntry
                                    key={entry.id}
                                    entry={entry}
                                    entries={entries}
                                    setEntries={setEntries}
                                    showOldEntries={showOldEntries}
                                    expired={expired}
                                    index={index} />
                            }
                        </>
                    )
                })}
            </div>
        </div>
    )
}

export default Category