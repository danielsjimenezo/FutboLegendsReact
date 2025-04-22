import { useState, useRef } from "react"
import useClickOutside from "../utilities/useClickOutside.jsx"
import { usePlayerContext } from "../context/PlayerContext.jsx"

function HomePageChartSelectorMenu({ LABELS }) {
    const [menuShown, setMenuShown] = useState(false)
    const containerRef = useRef(null)

    const { setPlayerSort } = usePlayerContext()

    useClickOutside(containerRef, () => {
        setMenuShown(false)
    })

    return (
        <div className="selector-container" ref={containerRef}>
            <button onClick={() => setMenuShown(!menuShown)}>
                <img src="/images/Icons/hdots.svg" alt="" />
            </button>
            <div className={`menu ${menuShown ? 'shown' : ''}`}>
                {Object.entries(LABELS).map(([sortType, label]) => {
                    return (
                        <button key={sortType} onClick={() => {
                            setPlayerSort(sortType)
                            setMenuShown(false)
                        }}>
                            {label}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default HomePageChartSelectorMenu