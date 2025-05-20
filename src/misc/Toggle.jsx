import { useState } from "react";

function Toggle({ option1, option2, onClick, defaultValue = option1.value, style = {} }) {

    const [selected, setSelected] = useState(defaultValue)

    return (
        <div className="toggle-container" style={style}>
            <div className="toggle">
                <button 
                    onClick={(e) => {
                        setSelected(option1.value)
                        onClick(e, option1)
                    }} 
                    className={selected === option1.value ? 'active' : ''}
                >
                    {option1.label || (
                        <img src={option1.img} />
                    )}
                </button>
                <button 
                    onClick={(e) => {
                        setSelected(option2.value)
                        onClick(e, option2)
                    }} 
                    className={selected === option2.value ? 'active' : ''}
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