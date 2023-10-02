const newSubCategorySelect = ({ setChosenSubCategory, selectedSubCategories }) => {
    return (
        <label htmlFor="newSubCategorySelect" onChange={(e) => setChosenSubCategory(e.target.value)}>Sub-Category<br />
            <select id="newSubCategorySelect" defaultValue="DEFAULT" >
                <option value="DEFAULT" hidden disabled >Choose Sub-Category...</option>
                {selectedSubCategories.map((cat) => {
                    return (<option key={cat.name} value={cat.name}>{cat.name}</option>)
                })}
            </select>
        </label>
    )
}

export default newSubCategorySelect