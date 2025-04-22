import { usePlayerContext } from "../context/PlayerContext.jsx";
import PlayerTable from "../tables/PlayerTable.jsx";
import HomePageChartSelector from "../charts/HomePageChartSelector.jsx";

function HomePage() {
  const { players } = usePlayerContext();

  return (
    <>
      <section className="content-container container">
        <section className="charts-container">
          <HomePageChartSelector />
        </section>

        <PlayerTable />
      </section>
    </>
  );
}

export default HomePage;
