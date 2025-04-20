import { usePlayerContext } from "../context/PlayerContext.jsx";

function PlayerTablePaginationControls() {
    const { 
        filteredPageCount,
        playersPageNumber,
        actions
    } = usePlayerContext();
    
    return (
        <div id="paginationButtons">
            <div>
                {playersPageNumber > 1 && (
                    <button
                        className="tableBtns prev"
                        id="prev"
                        onClick={() => actions.turnPage(-1)}
                    >
                        Previous
                    </button>
                )}
            </div>
            <div className="paginationState">
                Page {playersPageNumber} of {filteredPageCount}
            </div>
            <div>
                {playersPageNumber < filteredPageCount && (
                    <button
                        className="tableBtns next"
                        id="next"
                        onClick={() => actions.turnPage(1)}
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    )
}

export default PlayerTablePaginationControls