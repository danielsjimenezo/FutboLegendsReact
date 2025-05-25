import { useSelector, useDispatch } from "react-redux";
import { selectPlayerState } from "../context/playerSlice.js";
import { turnPage } from "../context/playerSlice.js";

function PlayerTablePaginationControls() {
    const { 
        filteredPageCount,
        playersPageNumber,
    } = useSelector(selectPlayerState);

    const dispatch = useDispatch()
    
    return (
        <div id="paginationButtons">
            <div>
                {playersPageNumber > 1 && (
                    <button
                        className="tableBtns prev"
                        id="prev"
                        onClick={() => dispatch(turnPage(-1))}
                    >
                        Previous
                    </button>
                )}
            </div>
            <div className="paginationState">
                {playersPageNumber} of {filteredPageCount}
            </div>
            <div>
                {playersPageNumber < filteredPageCount && (
                    <button
                        className="tableBtns next"
                        id="next"
                        onClick={() => dispatch(turnPage(1))}
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    )
}

export default PlayerTablePaginationControls