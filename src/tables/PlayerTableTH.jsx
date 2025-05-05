import { useSelector } from "react-redux"
import { selectPlayerState } from "../context/playerSlice.js"

function PlayerTableTH({ sort, label }) {

    const { playerSort, shownColumns, setPlayerSort, homeTableColumnWidth } = useSelector(selectPlayerState)

    if (!shownColumns.includes(sort)) return <></>

    return (
        <th style={{ width: homeTableColumnWidth }}>
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