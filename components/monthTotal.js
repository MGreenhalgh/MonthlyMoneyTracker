import GBP from "@/helpers/gbp"

const MonthTotal = ({ monthlyTotal }) => {
    let positive = monthlyTotal < 0 ? false : true

    return (
        <div className={`monthlyTotal ${positive ? "" : "red"}`}>
            {GBP.format(monthlyTotal)}
        </div>
    )
}

export default MonthTotal