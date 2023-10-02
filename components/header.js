import { useState } from "react";
import MonthDates from "./monthDates";
import MonthTotal from "./monthTotal";
import CategoryConfigForm from "./categoryConfigForm";

const Header = ({ username, monthlyTotal, categories, setCategories, subCategories, setSubCategories, showEntryList, setShowEntryList }) => {

    const [showCategoryConfig, setShowCategoryConfig] = useState(false)

    const ToggleEntryList = () => {
        if (showEntryList) setShowEntryList(false)
        else setShowEntryList(true)
    }

    return (
        <header>
            <div className="left">
                {/* <span className="userGreeting">Hi, {username}</span> */}
            </div>
            <div className="monthlySpending">
                <div className="monthlyText">Your total money in/out this month is:</div>
                <MonthTotal monthlyTotal={monthlyTotal} />
                <MonthDates />
            </div>
            <div className="right">
                <button type="button" className="userHolder" onClick={() => ToggleEntryList()} >{username}</button>
                <button type="button" className="configButton" onClick={() => setShowCategoryConfig(true)}>Config</button>

            </div>

            {showCategoryConfig &&
                <CategoryConfigForm
                    categories={categories}
                    setCategories={setCategories}
                    subCategories={subCategories}
                    setSubCategories={setSubCategories}
                    setShowCategoryConfig={setShowCategoryConfig} />}

        </header>
    )
}

export default Header