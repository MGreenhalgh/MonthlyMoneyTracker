import { useEffect, useState } from "react"
import Header from "./header"
import NewEntryForm from "./newEntryForm"
import Category from "./category"
import GBP from "@/helpers/gbp"
import CategoryGroup from "./CategoryGroup"


import ExpensesChart from "./expensesChart"

const App = () => {

    const [username, setUsername] = useState('Mat')
    const [monthlyTotal, setMonthlyTotal] = useState(0)

    const [entries, setEntries] = useState([]);
    const [monthEntries, setMonthEntries] = useState([])

    const [showNewEntryForm, setShowNewEntryForm] = useState(false)
    const [showOldOutEntries, setShowOldOutEntries] = useState(true)
    const [showOldInEntries, setShowOldInEntries] = useState(true)

    const [categories, setCategories] = useState([])
    const [subCategories, setSubCategories] = useState([])

    useEffect(() => {
        const fetchEntries = async () => {
            const response = await fetch("/api/entries");
            const data = await response.json();

            setEntries(data);
        }
        fetchEntries()
    }, [])

    useEffect(() => {
        const fetchcategories = async () => {
            let res = await fetch('categories.json')
            let categories = await res.json()
            categories.sort((a, b) => {
                let fa = a.name.toLowerCase(),
                    fb = b.name.toLowerCase();
                if (fa < fb) return -1;
                if (fa > fb) return 1;
                return 0;
            })
            setCategories(categories)

            let res2 = await fetch('subCategories.json')
            let subCategories = await res2.json()
            subCategories.sort((a, b) => {
                let fa = a.name.toLowerCase(),
                    fb = b.name.toLowerCase();
                if (fa < fb) return -1;
                if (fa > fb) return 1;
                return 0;
            })
            setSubCategories(subCategories)
        }
        fetchcategories()
    }, [])

    useEffect(() => {
        let today = new Date
        let earlierDate = new Date(new Date().setDate(today.getDate() - 30))
        let filteredEntries = []
        entries.map(e => { if (new Date(e.date) >= earlierDate && new Date(e.date) <= today) filteredEntries.push(e) })
        setMonthEntries(filteredEntries)

        setCategories(old => {
            let newSort = old.sort((a, b) => {
                if (a.out) return -1;
                if (b.out) return 1;
                return 0;
            })
            return newSort
        })
    }, [entries, categories])

    useEffect(() => {
        let newtotal = 0
        monthEntries.forEach(i => { i.out ? newtotal -= i.value : newtotal += i.value })
        setMonthlyTotal(newtotal)
    }, [monthEntries])

    return (
        <>
            <Header
                username={username}
                monthlyTotal={monthlyTotal}
                categories={categories}
                setCategories={setCategories}
                subCategories={subCategories}
                setSubCategories={setSubCategories} />

            <div className="appBody">
                {showNewEntryForm &&
                    <NewEntryForm
                        setEntries={setEntries}
                        setShowNewEntryForm={setShowNewEntryForm}
                        categories={categories}
                        subCategories={subCategories}
                    />}

                <div className="categoriesHolder">
                    <CategoryGroup out={true}
                        monthEntries={monthEntries}
                        entries={entries}
                        setEntries={setEntries}
                        categories={categories}
                        showOldEntries={showOldOutEntries}
                        setShowOldEntries={setShowOldOutEntries} />

                    <CategoryGroup out={false}
                        monthEntries={monthEntries}
                        entries={entries}
                        setEntries={setEntries}
                        categories={categories}
                        showOldEntries={showOldInEntries}
                        setShowOldEntries={setShowOldInEntries} />
                </div>

                <div className="chartHolder" >
                    <ExpensesChart
                        entries={monthEntries}
                        categories={categories}
                        subCategories={subCategories} />
                </div>
            </div>

            <ul className="entryDisplay">
                {entries.map((entry) => {
                    return (
                        <li key={entry.id}>
                            {entry.id}: {entry.out ? "Spent" : "Recieved"} {GBP.format(entry.value)} {entry.out ? "on" : "from"} {entry.category} {entry.subCategory ? `(${entry.subCategory})` : ''} on {entry.date}{entry.note ? `, note: ${entry.note}.` : '.'}
                        </li>
                    );
                })}
            </ul>

            <button id="showFormButton" type="button" onClick={() => setShowNewEntryForm(true)}></button>
        </>
    )
}

export default App