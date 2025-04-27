import { usePlayerContext } from "../context/PlayerContext.jsx";
import PlayerTable from "../tables/PlayerTable.jsx";
import HomePageChartSelector from "../charts/HomePageChartSelector.jsx";

function HomePage() {
  const { playerSort, secondChart, setPlayerSort, setSecondChart } = usePlayerContext();


  return (
    <>
      <section className="content-container container">
        <section className="charts-container">
          <HomePageChartSelector chartKey={playerSort} setter={setPlayerSort} />
          <HomePageChartSelector chartKey={secondChart} setter={setSecondChart} />
        </section>

        <PlayerTable />
      </section>
    </>
  );
}

export default HomePage;
