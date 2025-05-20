import { useSelector, useDispatch } from "react-redux";
import { selectPlayerState } from "../context/playerSlice.js";
import { changeLeftChart, setSecondChart } from "../context/playerSlice.js";
import PlayerTable from "../tables/PlayerTable.jsx";
import HomePageChartSelector from "../charts/HomePageChartSelector.jsx";
import { futbolDataTypes } from "../utilities/futbolDataTypes.jsx";

const getDifferentChart = (chart1, chart2) => {
  return futbolDataTypes.find((t) => t.id !== chart1 && t.id !== chart2).id;
};

function HomePage() {
  const { playerSort, secondChart } = useSelector(selectPlayerState);
  const dispatch = useDispatch();

  return (
    <>
      <section className="content-container container">
        <section className="charts-container">
          <HomePageChartSelector
            chartKey={playerSort}
            setter={(chartId) => dispatch(changeLeftChart(chartId))}
            id="home-page-chart-selector-left"
          />
          <HomePageChartSelector
            chartKey={
              secondChart === playerSort
                ? getDifferentChart(playerSort, secondChart)
                : secondChart
            }
            setter={(chartId) => dispatch(setSecondChart(chartId))}
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
