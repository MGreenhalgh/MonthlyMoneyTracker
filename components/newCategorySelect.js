const newCategorySelect = ({ setChosenCategory, selectedCategories, categorySelectValue, setCategorySelectValue }) => {
    return (
        <label htmlFor="newCategorySelect" onChange={(e) => setChosenCategory(e.target.value)}>Category<br />
            <select id="newCategorySelect" value={categorySelectValue} onChange={(e) => setCategorySelectValue(e.target.value)}>
                <option value="DEFAULT" hidden disabled >Choose Category...</option>
                {selectedCategories.map((cat) => {
                    return (<option key={cat.name} value={cat.name}>{cat.name}</option>)
                })}
            </select>
        </label>
    )
}

export default newCategorySelect