import './DropdownFilter.css'
import { useState, useRef } from "react"
import { usePlayerContext } from "../context/PlayerContext.jsx"
import useClickOutside from '../utilities/useClickOutside.jsx'

function DropdownFilter({
    id,
    icon,
    filterKey
}) {

    const { 
        countries, 
        positions,
        actions
    } = usePlayerContext()
    
    const [shown, setShown] = useState(false)
    const [selected, setSelected] = useState(-1)

    const wrapperRef = useRef(null)
    useClickOutside(wrapperRef, () => {
        setShown(false)
    })

    const menuItems = (
          filterKey === 'countries' ? countries
        : filterKey === 'positions' ? positions
        : positions
    ).map(str => {
        return {
            text: str
        }
    });

    const toggleShown = () => {
        setShown(!shown)
    }

    const RightTriangle = () => (
        <img src="/images/Icons/rtri.svg" alt="right-pointing triangle" />
    )



    const handleChoose = (choice, i) => {
        actions.changeFilter(filterKey, choice.text)
        setShown(false)
        setSelected(i)
    }

    return (
        <div id={id} className="filter-wrapper" ref={wrapperRef}>
            <button className="filter-button" onClick={toggleShown}>
                <img src={`/images/Icons/${icon}.png`} alt={icon} />
            </button>
            <div className={`filter-menu ${shown ? "shown":""}`}>
                <button 
                    className={`${selected === -1 ? 'selected':''}`} 
                    onClick={() => handleChoose({text: 'all'}, -1)}
                >
                    <div>
                        {selected === -1 && <RightTriangle />}
                    </div>
                    All
                </button>
                {menuItems.map((item, i) => {
                    return (
                        <button 
                            key={item.text} 
                            className={`${selected === i ? 'selected':''}`}
                            onClick={() => handleChoose(item, i)}
                        >
                            <div>
                                {selected === i && <RightTriangle />}
                            </div>
                            {item.text}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default DropdownFilter