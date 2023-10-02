const MonthDates = () => {

    let today = new Date
    let month = today.getMonth() + 1
    let earlierDate = new Date(new Date().setDate(today.getDate() - 30));
    let earlierMonth = earlierDate.getMonth() + 1
    let separator = " - "


    return (
        <div className="monthDates">
            {earlierDate.getDate().toString().padStart(2, '0')}/
            {earlierMonth.toString().padStart(2, '0')}/
            {earlierDate.getFullYear()}
            {separator}
            {today.getDate().toString().padStart(2, '0')}/
            {month.toString().padStart(2, '0')}/
            {today.getFullYear()}
        </div>
    )
}

export default MonthDates