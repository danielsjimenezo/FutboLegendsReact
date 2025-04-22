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
            <th></th>
            <th className="left">Name</th>
            <th>Position</th>
            <th>Country</th>
            <th>Games</th>
            <th>
              <button onClick={() => setPlayerSort('goals')}>
                {playerSort === 'goals' && (
                  <img src="/images/Icons/darr.png" alt="down arrow" />
                )}
                Goals
              </button>
            </th>
            <th>
              <button onClick={() => setPlayerSort('assists')}>
                {playerSort === 'assists' && (
                  <img src="/images/Icons/darr.png" alt="down arrow" />
                )}
                Assists
              </button>
            </th>
            <th>
              <button onClick={() => setPlayerSort('contributions')}>
                {playerSort === 'contributions' && (
                  <img src="/images/Icons/darr.png" alt="down arrow" />
                )}
                G+A
              </button>
            </th>
            <th>
              <button onClick={() => setPlayerSort('efficiency')}>
                {playerSort === 'efficiency' && (
                  <img src="/images/Icons/darr.png" alt="down arrow" />
                )}
                G+A/Game
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
