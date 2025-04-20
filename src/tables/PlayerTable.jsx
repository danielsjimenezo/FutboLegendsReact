import { usePlayerContext } from "../context/PlayerContext.jsx";
import PlayerTableRow from "./PlayerTableRow.jsx";
import PlayerTablePaginationControls from "./PlayerTablePaginationControls.jsx";

function PlayerTable() {
  const { 
    displayedPlayers, 
    playersLoadingState,
    playersPageNumber,
    PER_PAGE
  } = usePlayerContext();

  return (
    <section className="table-container">
      <table id="table">
        <thead>
          <tr className="header-row">
            <th></th>
            <th className="left">Name</th>
            <th>Position</th>
            <th>Country</th>
            <th>Games</th>
            <th>Goals</th>
            <th>Assists</th>
            <th>G+A</th>
            <th>G+A/Game</th>
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
