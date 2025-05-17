import { useState } from "react";

function Toggle({ option1, option2, onClick }) {

    const [selected, setSelected] = useState(option1)

    return (
        <div id="team-table-toggle-container">
            <div id="team-table-toggle">
                <button 
                    onClick={(e) => {
                        setSelected(option1)
                        onClick(e, option1)
                    }} 
                    className={selected.value === option1.value ? 'active' : ''}
                >
                    {option1.label || (
                        <img src={option1.img} />
                    )}
                </button>
                <button 
                    onClick={(e) => {
                        setSelected(option2)
                        onClick(e, option2)
                    }} 
                    className={selected.value === option2.value ? 'active' : ''}
                >
                    {option2.label || (
                        <img src={option2.img} />
                    )}
                </button>
            </div>
        </div>
    )
}

export default Toggle;