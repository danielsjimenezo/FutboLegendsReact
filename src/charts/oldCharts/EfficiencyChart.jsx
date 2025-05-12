import Chart from "./Chart.jsx";
import { usePlayerContext } from "../context/PlayerContext.jsx";

import {
  HOME_PAGE_CHART_ASPECT_RATIO,
  createGradient,
} from "../utilities/utilities.js";

function percentToNumber(str) {
  return Number(str);
}

function EfficiencyChart({ readAllPlayers }) {
  const { displayedPlayers, players, PER_PAGE } = usePlayerContext();
  const playerArr = readAllPlayers ? players : displayedPlayers;

  const sorted = playerArr
    .toSorted((a, b) => {
      return b.Efficiency - a.Efficiency;
    })
    .slice(0, PER_PAGE);

  const names = sorted.map((p) => p.Player);
  const efficiencyData = displayedPlayers.map((p) =>
    percentToNumber(p.Efficiency)
  );

  return (
    <>
      <Chart
        options={{
          type: "bar",
          data: {
            labels: names,
            datasets: [
              {
                backgroundColor: createGradient("transparent", "#2BC1B7"),
                data: efficiencyData,
                borderRadius: {
                  topRight: 10,
                  bottomRight: 10,
                },
                base: 0,
                label:
                  "Efficiency" +
                  (readAllPlayers ? " (all players)" : " (this page)"),
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

export default EfficiencyChart;
