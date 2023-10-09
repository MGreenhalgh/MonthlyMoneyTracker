import { useEffect, useRef, useState } from "react"
import NewFormButtonHolder from "./newFormButtonHolder"
import NewCategorySelect from "./newCategorySelect"
import NewSubCategorySelect from "./newSubCategorySelect"

const NewEntryForm = ({ setEntries, setShowNewEntryForm, categories, subCategories }) => {

    const [outSelected, setOutSelected] = useState(true)

    const [categorySelectValue, setCategorySelectValue] = useState('DEFAULT')

    const [selectedCategories, setSelectedCategories] = useState([])
    const [selectedSubCategories, setSelectedSubCategories] = useState([])

    const [chosenCategory, setChosenCategory] = useState('')
    const [chosenSubCategory, setChosenSubCategory] = useState('')

    const [chosenDate, setChosenDate] = useState('')

    const [chosenValue, setChosenValue] = useState('')

    const [note, setNote] = useState('')

    useEffect(() => {
        setChosenCategory('')
        setChosenSubCategory('')
        let newArray = categories.filter((c) => { return c.out == outSelected })
        setSelectedCategories(newArray)
    }, [outSelected, categories])

    useEffect(() => {
        let newArray = subCategories.filter((c) => { return c.category == chosenCategory })
        setSelectedSubCategories(newArray)
    }, [outSelected, categories, chosenCategory, subCategories])

    const addEntry = async (entryObj) => {
        const response = await fetch("/api/entries", {
            method: "POST",
            body: JSON.stringify(entryObj),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        setEntries(data);
    }

    const HandleSubmit = (e) => {
        e.preventDefault()

        if (chosenCategory == '' || selectedSubCategories.length > 1 && chosenSubCategory == '' || chosenDate == '' || chosenValue == '') {

            alert(`You need to fill out the following:
        ${chosenCategory == '' ? "❌ Category" : "✅ Category"}
        ${chosenSubCategory == '' ? "❌ Sub-Category" : "✅ Sub-Category"}
        ${chosenDate == '' ? "❌ Date" : "✅ Date"}
        ${chosenValue == '' ? "❌ Value" : "✅ Value"}`)
            return
        }
        console.log(`In or out: ${outSelected ? "out" : "in"} \nCategory: ${chosenCategory} \nSub Category: ${chosenSubCategory} \nDate: ${chosenDate} \nValue: £${chosenValue} `);
        addEntry({ id: crypto.randomUUID, out: outSelected, category: chosenCategory, subCategory: chosenSubCategory, date: chosenDate, value: Number(chosenValue), note: note })

        setCategorySelectValue('DEFAULT')
        setChosenCategory('')
        setChosenSubCategory('')
        setChosenValue('')
        setNote('')
    }

    return (
        <div id="formOutside" onClick={(e) => { if (e.target == e.currentTarget) setShowNewEntryForm(false) }}>
            <form className="newEntryForm" onSubmit={HandleSubmit} >
                <h2>New Entry</h2>

                <button className="closeButton" onClick={() => setShowNewEntryForm(false)}></button>

                <NewFormButtonHolder
                    outSelected={outSelected}
                    setOutSelected={setOutSelected} />

                <NewCategorySelect
                    setChosenCategory={setChosenCategory}
                    selectedCategories={selectedCategories}
                    categorySelectValue={categorySelectValue}
                    setCategorySelectValue={setCategorySelectValue} />

                {chosenCategory !== '' && selectedSubCategories.length != [] &&
                    <NewSubCategorySelect setChosenSubCategory={setChosenSubCategory} selectedSubCategories={selectedSubCategories} />}

                <label htmlFor="entryDate">Date<br />
                    <input id="entryDate" type="date" onChange={(e) => setChosenDate(e.target.value)} value={chosenDate} ></input>
                </label>

                <label htmlFor="entryValue">Value (£)<br />
                    <input id="entryValue" type="number" onChange={(e) => setChosenValue(e.target.value)} value={chosenValue} ></input>
                </label>

                <label htmlFor="entryNote">Note (optional)<br />
                    <input id="entryNote" type="text" onChange={(e) => setNote(e.target.value)} value={note}></input>
                </label>

                <button className="submitButton">Submit</button>
            </form>
        </div>
    )
}

export default NewEntryForm