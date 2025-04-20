import { usePlayerContext } from "../context/PlayerContext.jsx";

function PlayerTable() {
  const { players } = usePlayerContext();
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
        <tbody></tbody>
      </table>
      <div id="paginationButtons">
        <button className="tableBtns prev" id="prev">
          Previous
        </button>
        <button className="tableBtns next" id="next">
          Next
        </button>
      </div>
    </section>
  );
}

export default PlayerTable;
