import Chart from "./Chart.jsx";
import { useSelector } from "react-redux";
import { selectPlayerState } from "../context/playerSlice.js";
import { graphColors, shortenName } from "../utilities/utilities.js";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  console.log(futbolType);

  const { displayedPlayers, players, PER_PAGE } =
    useSelector(selectPlayerState);
  const playerArr = readAllPlayers ? players : displayedPlayers;
  console.log(playerArr);

  const sorted = playerArr
    .toSorted((a, b) => b[futbolType.id] - a[futbolType.id])
    .slice(0, PER_PAGE);
  //console.log(sorted);

  const names = sorted.map((p) => shortenName(p.name));
  //console.log(names) //me vota los valores que son

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
        // beginAtZero: true,
        ticks: { color: "white" },
      },
      y: {
        // beginAtZero: true,
        ticks: { color: "white" },
      },
    },
    aspectRatio: HOME_PAGE_CHART_ASPECT_RATIO,
    onClick: (evt, elements) => {
      const index = elements[0].index;
      console.log(elements);
      const player = sorted[index];
      console.log(player)
      navigate(`/profile/${player.name.replaceAll(" ", "_")}`);
    },
    onHover: (event, elements) => {
      // Change the cursor style only if hovering over a bar
      event.native.target.style.cursor = elements.length
        ? "pointer"
        : "default";
    },
  };

  if (futbolType.multiData) {
    // Multiple data, like in the contributions chart
    datasets = [];

    // Create datasets
    for (let i = 0; i < futbolType.multiData.length; i++) {
      const { label, gradient, id } = futbolType.multiData[i];
      
      datasets.push({
        ...defaultDataSet(),
        backgroundColor: createGradient(...gradient),
        data: sorted.map((p) => p[id]),
        label,
      });
    }
    //console.log(datasets)
    // Tweak options
    // delete options.scales.x.beginAtZero;
    // delete options.scales.y.beginAtZero;
    options.scales.x.stacked = true;
    options.scales.y.stacked = true;
  } else {
    // Single data (most charts use this)
    const data = sorted.map((p) => p[futbolType.id]);
    
    // options.scales.x.min = Math.floor(Math.min(...data) * 0.85)
    datasets = [
      {
        ...defaultDataSet(),
        // backgroundColor: futbolType.gradient
        //   ? createGradient(...futbolType.gradient)
        //   : createGradient("transparent", "#AF95FC"),
        backgroundColor: createGradient(
          graphColors[`${readAllPlayers ? "pink" : "purple"}RGBA`](0.5),
          graphColors[readAllPlayers ? "pink" : "purple"], 
          0,
          300,
          0,
          0
        ),
        data: data,
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
