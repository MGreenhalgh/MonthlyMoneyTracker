import Category from "./category"

const categoryGroup = ({ out, entries, monthEntries, setEntries, categories, showOldEntries, setShowOldEntries }) => {

    return (
        <>
            <div className="categoryGroupHeading" >{`${out ? "Expenses" : "Income"}`}
                <label htmlFor="showOldCheckbox">Show entries older than a month
                    <input id="showOldCheckbox" type="checkbox" checked={showOldEntries} onChange={(e) => setShowOldEntries(e.target.checked)} />
                </label>
            </div>
            <div className="categoryGroup" >
                {categories.map((category) => {
                    let categoryEntries = []
                    if (out) { categoryEntries = entries.filter(e => { return e.category == category.name && category.out }) }
                    else { categoryEntries = entries.filter(e => { return e.category == category.name && !category.out }) }
                    if (categoryEntries.length > 0) return (
                        <Category key={category.id}
                            category={category}
                            entries={categoryEntries}
                            setEntries={setEntries}
                            monthEntries={monthEntries}
                            showOldEntries={showOldEntries} />
                    )
                })}
            </div>
        </>
    )
}

export default categoryGroup