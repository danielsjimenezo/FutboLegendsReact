import Chart from "./Chart.jsx";
import { usePlayerContext } from "../context/PlayerContext.jsx";

import {
  HOME_PAGE_CHART_ASPECT_RATIO,
  createGradient,
} from "../utilities/utilities.js";

function Balon3Chart({ readAllPlayers }) {
  const { displayedPlayers, players, PER_PAGE } = usePlayerContext();
  const playerArr = readAllPlayers ? players : displayedPlayers;

  const sorted = playerArr
    .toSorted((a, b) => {
      return b["Balon (3rd)"] - a["Balon (3rd)"];
    })
    .slice(0, PER_PAGE);

  const names = sorted.map((p) => p.name);
  const balonData = sorted.map((p) => p["Balon (3rd)"]);

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
                data: balonData,
                borderRadius: {
                  topRight: 10,
                  bottomRight: 10,
                },
                base: 0,
                label:
                  "Goals" +
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

export default Balon3Chart;
