import Chart from "./Chart.jsx";
import { usePlayerContext } from "../context/PlayerContext.jsx";

import {
  HOME_PAGE_CHART_ASPECT_RATIO,
  createGradient,
} from "../utilities/utilities.js";

function HomePageChart({ key, label, readAllPlayers = false }) {
  const { displayedPlayers, players } = usePlayerContext();
  const playerArr = readAllPlayers ? players : displayedPlayers;

  const sorted = playerArr.toSorted((a, b) => {
    return b[key] - a[key];
  });

  const names = sorted.map((p) => p.name);
  const data = sorted.map((p) => p[key]);

  return (
    <>
      <Chart
        options={{
          type: "bar",
          data: {
            labels: names,
            datasets: [
              {
                backgroundColor: createGradient("transparent", "#FF4F8B"),
                data: data,
                borderRadius: {
                  topRight: 10,
                  bottomRight: 10,
                },
                base: 0,
                label: label,
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

export default HomePageChart;
