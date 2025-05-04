import "./PlayerTable.css";
import { usePlayerContext } from "../context/PlayerContext.jsx";
import PlayerTableTH from "./PlayerTableTH.jsx";
import PlayerTableRow from "./PlayerTableRow.jsx";
import PlayerTablePaginationControls from "./PlayerTablePaginationControls.jsx";

const headings = [
  ['Games', 'games'],
  ['Goals', 'goals'],
  ['Assists', 'assists'],
  ['G+A', 'contributions'],
  ['G+A/game', 'efficiency'],
  ['Balón (1)', 'balon1'],
  ['Balón (2)', 'balon2'],
  ['Balón (3)', 'balon3']
]

function PlayerTable() {
  const {
    displayedPlayers,
    playersLoadingState,
    playersPageNumber,
    PER_PAGE,
    homeTableColumnWidth
  } = usePlayerContext();


  // console.log("htcw:", homeTableColumnWidth)

  return (
    <section className="table-container">
      <table id="main-table">
        <thead>
          <tr className="header-row">
            <th className="rank"></th>
            <th className="left">Name</th>
            <th style={{ width: homeTableColumnWidth }}>Position</th>
            <th style={{ width: homeTableColumnWidth }}>Country</th>
            {headings.map(([label, sort]) => <PlayerTableTH 
              key={sort}
              sort={sort}
              label={label}
            />)}
          </tr>
        </thead>
        <tbody>
          {playersLoadingState === "loading" ? (
            <>
              <tr colSpan="100">
                <th>Loading...</th>
              </tr>
            </>
          ) : playersLoadingState === "error" ? (
            <>
              <tr colSpan="100">
                <th>Something went wrong</th>
              </tr>
            </>
          ) : (
            displayedPlayers.map((player, i) => {
              const rank = i + 1 + (playersPageNumber - 1) * PER_PAGE;
              return (
                <PlayerTableRow
                  key={player.Player}
                  player={player}
                  rank={rank}
                />
              );
            })
          )}
        </tbody>
      </table>
      <PlayerTablePaginationControls />
    </section>
  );
}

export default PlayerTable;
