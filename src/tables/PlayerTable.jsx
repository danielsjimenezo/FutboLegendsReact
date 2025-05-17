import "./PlayerTable.css";
import PlayerTableTH from "./PlayerTableTH.jsx";
import PlayerTableRow from "./PlayerTableRow.jsx";
import PlayerTablePaginationControls from "./PlayerTablePaginationControls.jsx";
import { futbolDataTypes } from "../utilities/futbolDataTypes.jsx";
import { selectPlayerState } from "../context/playerSlice.js";
import { useSelector } from "react-redux";

function PlayerTable() {
  const {
    displayedPlayers,
    playersLoadingState,
    playersPageNumber,
    PER_PAGE,
    homeTableColumnWidth,
  } = useSelector(selectPlayerState);

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
            {futbolDataTypes.map((type) => (
              <PlayerTableTH
                key={type.id}
                sort={type.id}
                label={type.labelShort}
              />
            ))}
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
