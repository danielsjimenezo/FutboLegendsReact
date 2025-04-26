import './PlayerTable.css'
import { usePlayerContext } from "../context/PlayerContext.jsx";
import PlayerTableRow from "./PlayerTableRow.jsx";
import PlayerTablePaginationControls from "./PlayerTablePaginationControls.jsx";

function PlayerTable() {
  const { 
    displayedPlayers, 
    playersLoadingState,
    playersPageNumber,
    PER_PAGE,
    playerSort,
    setPlayerSort
  } = usePlayerContext();

  return (
    <section className="table-container">
      <table id="main-table">
        <thead>
          <tr className="header-row">
            <th className='rank'></th>
            <th className="left">Name</th>
            <th>Position</th>
            <th>Country</th>
            <th>Games</th>
            <th>
              <button onClick={() => setPlayerSort('goals')}>
                Goals
                {playerSort === 'goals' && (
                  <img src="/images/Icons/darr.png" className="sort-arrow" alt="down arrow" />
                )}
              </button>
            </th>
            <th>
              <button onClick={() => setPlayerSort('assists')}>
                Assists
                {playerSort === 'assists' && (
                  <img src="/images/Icons/darr.png" className="sort-arrow" alt="down arrow" />
                )}
              </button>
            </th>
            <th>
              <button onClick={() => setPlayerSort('contributions')}>
                G+A
                {playerSort === 'contributions' && (
                  <img src="/images/Icons/darr.png" className="sort-arrow" alt="down arrow" />
                )}
              </button>
            </th>
            <th>
              <button onClick={() => setPlayerSort('efficiency')}>
                G+A/Game
                {playerSort === 'efficiency' && (
                  <img src="/images/Icons/darr.png" className="sort-arrow" alt="down arrow" />
                )}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {playersLoadingState === 'loading' ? (
            <>
              <tr colSpan="100">
                <th>
                  Loading...
                </th>
              </tr>
            </>
          ):playersLoadingState === 'error' ? (
            <>
              <tr colSpan="100">
                <th>Something went wrong</th>
              </tr>
            </>
          ):(
            displayedPlayers.map((player, i) => {
              const rank = (i + 1) + ((playersPageNumber-1) * PER_PAGE)
              return (
                <PlayerTableRow key={player.Player} player={player} rank={rank} />
              )
            })
          )}
        </tbody>
      </table>
      <PlayerTablePaginationControls />
    </section>
  );
}

export default PlayerTable;
