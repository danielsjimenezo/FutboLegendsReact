import HomePageChartSelectorMenu from "./HomePageChartSelectorMenu.jsx";
import "./HomePageChartSelector.css";
import { futbolDataTypes } from "../utilities/futbolDataTypes.jsx";
import FutbolChart from "./FutbolChart.jsx";

function HomePageChartSelector({
  chartKey,
  setter,
  readAllPlayers = false,
  id,
}) {
  const selectedType = futbolDataTypes.find((t) => t.id === chartKey);
  // const SelectedChartComponent = selectedType?.chart;

  // if (!SelectedChartComponent) {
  //   return <p>Chart "{chartKey}" missing</p>;
  // }

  return (
    <div className="homepage-chart">
      <p>
        {selectedType.labelLong}{" "}
        {readAllPlayers ? "(all players)" : "(this page)"}
      </p>
      {/* <SelectedChartComponent readAllPlayers={readAllPlayers} /> */}
      <FutbolChart readAllPlayers={readAllPlayers} futbolType={selectedType} />
      <HomePageChartSelectorMenu chartKey={chartKey} setter={setter} id={id} />
    </div>
  );
}

export default HomePageChartSelector;
