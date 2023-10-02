import { useState } from "react";
import MonthDates from "./monthDates";
import MonthTotal from "./monthTotal";
import CategoryConfigForm from "./categoryConfigForm";

const Header = ({ username, monthlyTotal, categories, setCategories, subCategories, setSubCategories }) => {

    const [showCategoryConfig, setShowCategoryConfig] = useState(false)

    return (
        <header>
            <div className="left">
                <span className="userGreeting">Hi, {username}</span>
                <button type="button" className="configButton" onClick={() => setShowCategoryConfig(true)}>Config</button>
            </div>
            <div className="monthlySpending">
                <div className="monthlyText">Your total money in/out this month is:</div>
                <MonthTotal monthlyTotal={monthlyTotal} />
                <MonthDates />
            </div>
            <button className="userHolder">{username}</button>

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