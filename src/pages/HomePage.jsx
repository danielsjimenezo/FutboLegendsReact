import { usePlayerContext } from "../context/PlayerContext.jsx";
import PlayerTable from "../tables/PlayerTable.jsx";
import HomePageChartSelector from "../charts/HomePageChartSelector.jsx";

const getDifferentChart = (chart1, chart2) => {
  const charts = ["goals", "assists", "contributions", "efficiency"];
  let i = 0;
  let chart = charts[i];
  while (chart === chart1 || chart === chart2) {
    i++;
    chart = charts[i];
  }
  return chart;
};

function HomePage() {
  const { playerSort, secondChart, setPlayerSort, setSecondChart } =
    usePlayerContext();

  return (
    <>
      <section className="content-container container">
        <section className="charts-container">
          <HomePageChartSelector chartKey={playerSort} setter={setPlayerSort} id="home-page-chart-selector-left" />
          <HomePageChartSelector
            chartKey={
              secondChart === playerSort ? getDifferentChart() : secondChart
            }
            setter={setSecondChart}
            readAllPlayers={true}
            id="home-page-chart-selector-right"
          />
        </section>

        <PlayerTable />
      </section>
    </>
  );
}

export default HomePage;
