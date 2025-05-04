import Chart from "./Chart.jsx";

import { usePlayerContext } from "../context/PlayerContext.jsx";

import {
  HOME_PAGE_CHART_ASPECT_RATIO,
  createGradient,
} from "../utilities/utilities.js";

function ContributionsChart({ readAllPlayers }) {
  const { displayedPlayers, players, PER_PAGE } = usePlayerContext();
  const playerArr = readAllPlayers ? players : displayedPlayers;

  const sorted = playerArr
    .toSorted((a, b) => {
      return b.Goals + b.Assists - (a.Goals + a.Assists);
    })
    .slice(0, PER_PAGE);

  const names = sorted.map((p) => p.Player);
  const goalData = sorted.map((p) => p.Goals);
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
                // backgroundColor: "#FF4F8B",
                backgroundColor: createGradient("transparent", "#FF4F8B"),
                data: goalData,
                borderRadius: {
                  topRight: 10,
                  bottomRight: 10,
                },
                base: 1,
                label:
                  "Goals",
              },
              {
                // backgroundColor: "#AF95FC",
                backgroundColor: createGradient(
                  "transparent",
                  "#AF95FC",
                  200,
                  0,
                  300,
                  0
                ),
                data: assistData,
                borderRadius: 10,
                base: 1,
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
              tooltip: {
                mode: "index",
                intersect: true
              },
            },
            interaction: {
              mode: "index",
              intersect: true
            },
            scales: {
              y: {
                stacked: true,
                ticks: { color: "white" },
              },
              x: {
                stacked: true,
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

export default ContributionsChart;
