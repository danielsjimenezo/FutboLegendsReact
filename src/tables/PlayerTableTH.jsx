import { usePlayerContext } from "../context/PlayerContext.jsx"

function PlayerTableTH({ sort, label }) {

    const { playerSort, shownColumns, setPlayerSort } = usePlayerContext()

    if (!shownColumns.includes(sort)) return <></>

    return (
        <th>
            <button onClick={() => setPlayerSort(sort)}>
                {label}
                {playerSort === sort && (
                    <img
                        src="/images/Icons/darr.png"
                        className="sort-arrow"
                        alt="down arrow"
                    />
                )}
            </button>
        </th>
    )
}

export default PlayerTableTH