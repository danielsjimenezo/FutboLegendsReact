//  npm create vite@latest ./

import loadComponent from "../../components/loadComponents.js";
await loadComponent("header", "header");
import { fetchData } from "../Utilities/fetchData.js";
import defineFilterHandlers from "../Utilities/defineFilterHandlers.js";

// Define variables for the elements we need to interact with
const filterMenu = document.querySelector("#filter-menu");
const filterButton = document.querySelector("#filter-button");
const filterWrapper = document.querySelector("#filter-menu-wrapper");
const globeFilterWrapper = document.querySelector("#globe-filter-menu-wrapper");
const globeFilterMenu = document.querySelector("#globe-filter-menu");
const globeFilterButton = document.querySelector("#globe-filter");

const contributionsChartEl = document.querySelector("#contributionsChart");
const efficiencyChartEl = document.querySelector("#efficiencyChart");
const goalsChartEl = document.querySelector("#goalsChart");
const assistsChartEl = document.querySelector("#assistsChart");

const showMoreBtn = document.querySelector("#show-more-btn");
const prevBtns = document.querySelectorAll(".prev");
const nextBtns = document.querySelectorAll(".next");

// constants
const PER_PAGE = 15;

// Setting original variables for charts & data
let contributionsChart;
let efficiencyChart;
let goalsChart;
let assistsChart;

let data;
let originalData;
let filtered;
let tablePage = 0;

let selectedPosition = "All";
let selectedCountry = "World";

// Calling the functions to execute data fetching and rendering
fetchDataAndPopulateTable();
fetchDataAndHandleButtons();

// // Click interaction for the filter button
// filterButton.addEventListener("click", () => {
//   filterMenu.classList.toggle("hidden");
// });

// //Click interaction for the globe filter button
// globeFilterButton.addEventListener("click", () => {
//   globeFilterMenu.classList.toggle("hidden");
// });

// onClickOutside(filterWrapper, () => {
//   filterMenu.classList.add("hidden");
// });

// onClickOutside(globeFilterWrapper, () => {
//   globeFilterMenu.classList.add("hidden");
// });

document.querySelector("#recordButtonn").classList.add("selected");

nextBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    if (tablePage >= filtered.length / PER_PAGE) return;
    tablePage++;
    renderTable([...filtered]);
    renderCharts([...filtered]);
  })
);

prevBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    if (tablePage <= 0) return;
    tablePage--;
    renderTable([...filtered]);
    renderCharts([...filtered]);
  })
);

showMoreBtn.addEventListener("click", () => {
  document.querySelectorAll(".mainChart").forEach((el) => {
    el.classList.toggle("hidden");
  });
});

// ⬆ execution ⬆
// ⬇ function definitions ⬇
// function onClickOutside(element, callback) {
//   document.addEventListener("click", (e) => {
//     if (e.target !== element && !element.contains(e.target)) {
//       callback(e);
//     }
//   });
// }

function getCurrentFilter() {
  console.log(`
    country: ${selectedCountry}
    position: ${selectedPosition}
  `);
  return [...originalData].filter((p) => {
    return (
      (selectedCountry === "World" || p.birthCountry === selectedCountry) &&
      (selectedPosition === "All" || p.Position === selectedPosition)
    );
  });
}

function setData(newData) {
  data = [...newData];
  filtered = [...newData];
}

// Function to convert percentage string to number
function percentToNumber(str) {
  return Number(str);
}

// Function to fetch data from JSON file
async function fetchDataAndHandleButtons() {
  const data = await fetchData();
  setData(data);
  originalData = [...data];
  renderCharts(data);

  defineFilterHandlers(data, {
    onAllPositionsSelected() {
      selectedPosition = "All";
      const all = getCurrentFilter();
      renderCharts(all);
      renderTable(all);
    },
    onPositionSelect(pos) {
      selectedPosition = pos;
      filtered = getCurrentFilter();
      renderCharts(filtered);
      renderTable(filtered);
    },
    onAllCountriesSelected() {
      selectedCountry = "World";
      const all = getCurrentFilter();
      renderCharts(all);
      renderTable(all);
    },
    onCountrySelect(cy) {
      selectedCountry = cy;
      filtered = getCurrentFilter();
      renderCharts(filtered);
      renderTable(filtered);
    },
  });
}

function createGradient(color1, color2, x1 = 0, y1 = 0, x2 = 300, y2 = 0) {
  return (ctx) => {
    const canvas = ctx.chart.ctx;
    const gradient = canvas.createLinearGradient(x1, y1, x2, y2);

    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);

    return gradient;
  };
}

function renderCharts(data) {
  if (contributionsChart) contributionsChart.remove();
  if (efficiencyChart) efficiencyChart.remove();
  if (goalsChart) goalsChart.remove();
  if (assistsChart) assistsChart.remove();

  let playersByGoalsAndAssists = [...data].sort((a, b) => {
    return b.Goals + b.Assists - (a.Goals + a.Assists);
  });

  let playersByEfficiency = [...data].sort((a, b) => {
    return percentToNumber(b.Efficiency) - percentToNumber(a.Efficiency);
  });

  let playersByGoals = [...data].sort((a, b) => {
    return b.Goals - a.Goals;
  });

  let playersByAssists = [...data].sort((a, b) => {
    return b.Assists - a.Assists;
  });

  // !!!!
  playersByGoalsAndAssists = pageSlice(playersByGoalsAndAssists);
  playersByEfficiency = pageSlice(playersByEfficiency);
  playersByGoals = pageSlice(playersByGoals);
  playersByAssists = pageSlice(playersByAssists);

  contributionsChart = document.createElement("canvas");
  contributionsChart.id = "contributions";
  contributionsChartEl.append(contributionsChart);

  efficiencyChart = document.createElement("canvas");
  efficiencyChart.id = "efficiency";
  efficiencyChartEl.append(efficiencyChart);

  goalsChart = document.createElement("canvas");
  goalsChart.id = "goals";
  goalsChartEl.append(goalsChart);

  assistsChart = document.createElement("canvas");
  assistsChart.id = "assists";
  assistsChartEl.append(assistsChart);

  const ASPECT_RATIO = 1 / 0.45;

  const contributionsChartt = new Chart("contributions", {
    type: "bar",
    data: {
      labels: playersByGoalsAndAssists.map((p) => p.name),
      datasets: [
        {
          // backgroundColor: "#FF4F8B",
          backgroundColor: createGradient("transparent", "#FF4F8B"),
          data: playersByGoalsAndAssists.map((p) => p.Goals),
          borderRadius: {
            topRight: 10,
            bottomRight: 10,
          },
          base: 1,
          label: "Goals",
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
          data: playersByGoalsAndAssists.map((p) => p.Assists || null),
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
      aspectRatio: ASPECT_RATIO,
    },
  });

  const efficiencyChartt = new Chart("efficiency", {
    type: "bar",
    data: {
      labels: playersByEfficiency.map((p) => p.name),
      datasets: [
        {
          backgroundColor: createGradient("transparent", "#2BC1B7"),
          data: playersByEfficiency.map((p) => percentToNumber(p.Efficiency)),
          borderRadius: {
            topRight: 10,
            bottomRight: 10,
          },
          base: 0,
          label: "G+A/Games",
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
      aspectRatio: ASPECT_RATIO,
    },
  });

  const goalsChartt = new Chart("goals", {
    type: "bar",
    data: {
      labels: playersByGoals.map((p) => p.name),
      datasets: [
        {
          backgroundColor: createGradient("transparent", "#FF4F8B"),
          data: playersByGoals.map((p) => p.Goals),
          borderRadius: {
            topRight: 10,
            bottomRight: 10,
          },
          base: 0,
          label: "Goals",
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
      aspectRatio: ASPECT_RATIO,
    },
  });

  const assistsChartt = new Chart("assists", {
    type: "bar",
    data: {
      labels: playersByAssists.map((p) => p.name),
      datasets: [
        {
          backgroundColor: createGradient("transparent", "#AF95FC"),
          data: playersByAssists.map((p) => p.Assists),
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
      aspectRatio: ASPECT_RATIO,
    },
  });
}

// Function to create table row
function createTableRow(player, i) {
  const profilePicSrc = `./images/Players/${player.name}.jpg`;
  const flagSrc = `./images/Flags/${player.birthCountry}.png`;
  const rank = i + 1 + tablePage * PER_PAGE;

  return `
    <tr>
      <td>
        ${rank}.
      </td>
      <td>
        <div class="name-td">
          <img src="${profilePicSrc}" alt="Photo of ${
    player.name
  }" class="picture ${
    player.active ? "active" : "inactive"
  }" loading="lazy">
          <a href="/profile.html?name=${player.name.replaceAll(" ", "_")}">
            ${player.name}
          </a>
        </div>
      </td>
      <td>
        ${player.Position}
      </td>
      <td>
          <img src="${flagSrc}" alt="Photo of ${
    player.birthCountry
  }" class="flag" loading="lazy">
      </td>
      <td>
        ${player.GamesPlayed}
      </td>
      <td>
        ${player.Goals}
      </td>
      <td>
        ${player.Assists}
      </td>
      <td>
        ${player.GoalContributions}
      </td>
      <td>
        ${player.Efficiency}
      </td>
    </tr>
  `;
}

// function to fetch data and populate table
async function fetchDataAndPopulateTable() {
  const data = await fetchData();
  setData(data);
  data.sort((a, b) => {
    return b.Goals + b.Assists - (a.Goals + a.Assists);
  });
  renderTable([...data]);
}

// Function to slice the data for pagination
function pageSlice(input) {
  const first = tablePage * PER_PAGE;
  const last = (tablePage + 1) * PER_PAGE;
  return input.slice(first, last);
}

// Function to render the table
function renderTable(input) {
  setData(input);
  const playerTableBody = document.querySelector("#table tbody");
  playerTableBody.innerHTML = "";

  // Function to render each row in the table
  pageSlice(data).forEach((player, i) => {
    const html = createTableRow(player, i);
    playerTableBody.insertAdjacentHTML("beforeend", html);
  });
}
