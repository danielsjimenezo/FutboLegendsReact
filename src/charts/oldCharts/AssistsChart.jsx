import Chart from "./Chart.jsx";
import { usePlayerContext } from "../context/PlayerContext.jsx";

import {
  HOME_PAGE_CHART_ASPECT_RATIO,
  createGradient,
} from "../utilities/utilities.js";

function AssistsChart({ readAllPlayers }) {
  const { displayedPlayers, players, PER_PAGE } = usePlayerContext();
  const playerArr = readAllPlayers ? players : displayedPlayers;

  const sorted = playerArr
    .toSorted((a, b) => {
      return b.Assists - a.Assists;
    })
    .slice(0, PER_PAGE);

  const names = sorted.map((p) => p.name);
  const assistData = sorted.map((p) => p.Assists || null);

  return (
    <>
      <Chart
        options={{
          type: "bar",
          data: {
            labels: names,
            datasets: [
              {
                backgroundColor: createGradient("transparent", "#AF95FC"),
                data: assistData,
                borderRadius: {
                  topRight: 10,
                  bottomRight: 10,
                },
                base: 0,
                label: "Assists",
              },
            ],
          },
          options: {
            indexAxis: "y",
            plugins: {
              legend: {
                display: false,
              },
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
          },
        }}
      />
    </>
  );
}

export default AssistsChart;
