import Chart from "./Chart.jsx";
import { useSelector } from "react-redux";
import { selectPlayerState } from "../context/playerSlice.js";
import { graphColors } from "../utilities/utilities.js";
const graphColorsArr = Object.values(graphColors);
import {
  HOME_PAGE_CHART_ASPECT_RATIO,
  createGradient,
} from "../utilities/utilities.js";

const defaultDataSet = () => {
  return {
    borderRadius: {
      topRight: 10,
      bottomRight: 10,
    },
    base: 0,
  };
};

function FutbolChart({ futbolType, readAllPlayers }) {
  const { displayedPlayers, players, PER_PAGE } =
    useSelector(selectPlayerState);
  const playerArr = readAllPlayers ? players : displayedPlayers;

  const sorted = playerArr.toSorted(futbolType.sortAlg).slice(0, PER_PAGE);

  const names = sorted.map((p) => p.Player);

  let datasets;
  const options = {
    indexAxis: "y",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: true,
      },
    },
    interaction: {
      mode: "index",
      intersect: true,
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: { color: "white" },
      },
      y: {
        beginAtZero: true,
        ticks: { color: "white" },
      },
    },
    aspectRatio: HOME_PAGE_CHART_ASPECT_RATIO,
  };

  if (futbolType.multiData) {
    // Multiple data, like in the contributions chart
    datasets = [];

    // Create datasets
    for (let i = 0; i < futbolType.multiData.length; i++) {
      const { label, gradient, getPlayerValue } = futbolType.multiData[i];

      datasets.push({
        ...defaultDataSet(),
        backgroundColor: createGradient(...gradient),
        data: sorted.map(getPlayerValue),
        label,
      });
    }
    // Tweak options
    delete options.scales.x.beginAtZero;
    delete options.scales.y.beginAtZero;
    options.scales.x.stacked = true;
    options.scales.y.stacked = true;
  } else {
    // Single data (most charts use this)
    datasets = [
      {
        ...defaultDataSet(),
        // backgroundColor: futbolType.gradient
        //   ? createGradient(...futbolType.gradient)
        //   : createGradient("transparent", "#AF95FC"),
        backgroundColor: createGradient(
          "transparent",
          graphColorsArr[readAllPlayers ? 0 : 2]
        ),
        data: sorted.map(futbolType.getPlayerValue),
        label: futbolType.labelShort,
      },
    ];
  }

  return (
    <>
      <Chart
        options={{
          type: "bar",
          data: {
            labels: names,
            datasets: datasets,
          },
          options,
        }}
      />
    </>
  );
}

export default FutbolChart;
