const NewFormButtonHolder = ({ outSelected, setOutSelected }) => {

    let colorClass = ""
    if (outSelected === true) colorClass = "out"
    else if (outSelected === false) colorClass = "in"

    return (
        <div className={`formButtonHolder ${colorClass} `}>
            <button className="outButton" type="button" onClick={() => setOutSelected(true)}>Out</button>
            <button className="inButton" type="button" onClick={() => setOutSelected(false)}>In</button>
        </div>
    )
}

export default NewFormButtonHolder