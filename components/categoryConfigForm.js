import { useState } from "react"
import NewFormButtonHolder from "./newFormButtonHolder"

const CategoryConfigForm = ({ categories, setCategories, subCategories, setSubCategories, setShowCategoryConfig }) => {

    const [newCategoryName, setNewCategoryName] = useState('')
    const [newCategoryOut, setNewCategoryOut] = useState(null)

    const randomColour = Math.floor(Math.random() * 16777215).toString(16);
    const [newCategoryColor, setNewCategoryColor] = useState(`#${randomColour}`)

    const [newSubCategoryParent, setNewSubCategoryParent] = useState('DEFAULT')

    const removeCategory = (category) => {
        setCategories(old => { return old.filter(c => c.name !== category.name) })
    }

    const editCategory = (category) => {
        let newName = prompt("Enter new cactegory name:", category.name)
        if (newName == null || newName == "") return
        else {
            let newCategories = [...categories]
            newCategories.find(c => c.name == category.name).name = newName
            setCategories(newCategories)
        }
    }

    const AddCategory = () => {
        setCategories(old => {
            return [...old, { name: newCategoryName, out: newCategoryOut, color: newCategoryColor }]
        })
        console.log(`name: ${newCategoryName}, out: ${newCategoryOut}, color: ${newCategoryColor}`)
    }

    const addSubCategory = (category) => {
        let newSubCatName = prompt("Enter new sub cactegory name:")
        if (newSubCatName == null || newSubCatName == "") { setNewSubCategoryParent('DEFAULT'); return }
        else {
            let newSubCategories = [...subCategories, { name: newSubCatName, category: category }]
            setSubCategories(newSubCategories)
        }
        setNewSubCategoryParent('DEFAULT')
    }

    return (
        <div id="formOutside" onClick={(e) => { if (e.target == e.currentTarget) setShowCategoryConfig(false) }}>
            <form className="newCategoryForm" >
                <h2>Category and Sub Category config</h2>

                <button type="button" className="closeButton" onClick={() => setShowCategoryConfig(false)}></button>
                <div className="existingCategoryList">
                    {categories.map(category => {
                        return (
                            <div key={category.name} className={`existingCategoryHolder ${category.out ? "out" : "in"}`}>
                                <span>{category.name}</span>
                                <button type="button" className="categoryRemoveButton" onClick={() => removeCategory(category)}></button>
                                <button type="button" className="categoryEditButton" onClick={() => editCategory(category)}></button>
                            </div>
                        )
                    })}
                </div>

                <div className="addCategory">
                    <h3>Add a new category</h3>
                    <input type="text" placeholder="Add new category..." onChange={(e) => setNewCategoryName(e.target.value)} />
                    <div>
                        <NewFormButtonHolder outSelected={newCategoryOut} setOutSelected={setNewCategoryOut} />
                        <input type="color" value={newCategoryColor} onChange={(e) => setNewCategoryColor(e.value)} />
                    </div>
                    <button type="button" className="submitButton" onClick={() => AddCategory()}>Add</button>
                </div>

                <div className="addSubCategory">
                    <h3>Add new sub category</h3>
                    <select id="addSubCategorySelect" value={newSubCategoryParent} onChange={(e) => addSubCategory(e.target.value)}>
                        <option value="DEFAULT" hidden disabled >Choose Category...</option>
                        {categories.map((cat) => {
                            return (<option key={cat.name} value={cat.name}>{cat.name}</option>)
                        })}
                    </select>
                </div>

            </form>
        </div>
    )
}

export default CategoryConfigForm