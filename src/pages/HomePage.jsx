import { usePlayerContext } from "../context/PlayerContext.jsx";
import PlayerTable from "../tables/PlayerTable.jsx";

function HomePage() {
  const { players } = usePlayerContext();

  return (
    <>
      <section className="content-container container">
        <section className="charts-container">
          <div className="mainChart" id="contributionsChart">
            <p>Goals + Assists</p>
          </div>
          <div className="mainChart" id="efficiencyChart">
            <p>Goals + Assists per Game</p>
          </div>
          <div className="mainChart hidden" id="goalsChart">
            <p>Top Goalscorers</p>
          </div>
          <div className="mainChart hidden" id="assistsChart">
            <p>Top Assisters</p>
          </div>
        </section>

        <div id="moreButton">
          <button id="show-more-btn">More charts</button>
        </div>

        <PlayerTable />
      </section>
    </>
  );
}

export default HomePage;
