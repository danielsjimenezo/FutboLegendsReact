import loadComponent from "../../components/loadComponents.js";
await loadComponent("header", "header");
import defineFilterHandlers from "../Utilities/defineFilterHandlers.js";

import { fetchData } from "../Utilities/fetchData.js";
import { createGoalTypeChart } from "../Charts/goalTypeChart.js";
import { createGoalTypeChart2 } from "../Charts/goalTypeChart2.js";

/// DOM Elements

const playerDescEl = document.querySelector(".playerDesc");
const playerPicEl = document.querySelector(".playerPic");
const gamesPlayedEl = document.querySelector(".gamesPlayed");
const goalsScoredEl = document.querySelector(".goalsScored");
const assistsMadeEl = document.querySelector(".assistsMade");
const tbody = document.querySelector("#team-stats");
const goalContributionsMadeEl = document.querySelector(
  ".goalContributionsMade"
);
const goalContributionsPerGameEl = document.querySelector(
  ".goalContributionsPerGame"
);

// DOM Elements for Rank

// const assistsRankEl = document.querySelector("#assistsRank");
// const goalsRankEl = document.querySelector("#goalsRank");

// State
let selectedPosition = "All";
let selectedCountry = "World";
let data = [];
let originalData = [];
let player = {};
let chartsRendered = false;
let tablesRendered = false;

/// Execution

loadProfile();

/// Functions

function renderBadge(id) {
  document.querySelector(`#${id} span`).innerText = player[id];
}

function toNumber(val) {
  if (typeof val === "number") return val;
  return Number(val.replaceAll(",", "")) || 0;
}

function calculateRank(data, player, key, birthCountry) {
  let rankings = [...data].sort((a, b) => {
    // Number("1,001") -> NaN
    return toNumber(b[key]) - toNumber(a[key]);
  });

  if (birthCountry !== undefined) {
    rankings = rankings.filter((p) => p.birthCountry === birthCountry);
  }

  const index = rankings.findIndex((p) => p.Player === player.Player);

  return index + 1;
}

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

async function loadProfile() {
  const { name } = Object.fromEntries(
    new URL(window.location.href).searchParams
  );

  data = await fetchData();
  originalData = [...data];

  // !!!
  defineFilterHandlers(data, {
    onAllPositionsSelected() {
      selectedPosition = "All";
      data = getCurrentFilter();
      appendAndRender();
    },
    onPositionSelect(pos) {
      selectedPosition = pos;
      data = getCurrentFilter();
      appendAndRender();
    },
    onAllCountriesSelected() {
      selectedCountry = "World";
      data = getCurrentFilter();
      appendAndRender();
    },
    onCountrySelect(cy) {
      selectedCountry = cy;
      data = getCurrentFilter();
      appendAndRender();
    },
  });

  player = data.find((p) => {
    return p.Player === name.replaceAll("_", " ");
  });

  if (player) {
    console.log("Player before appending:", { ...player });
    appendAndRender();
  } else {
    alert("Player not found");
    window.location.href = "/index.html";
  }
}

function appendAndRender() {
  appendTeamData(player);
  appendPlayerRankings(player, data);
  console.log("PLAYER:", player);
  renderPlayerInfo(player);
  renderPlayerCharts(player);
  renderPlayerBadges(player);
  renderPlayerBadgesRank(player);
  appendTableRows(player);
}

function appendPlayerRankings(player, data) {
  player.gamesPlayedRank = calculateRank(data, player, "GamesPlayed");
  player.goalsRank = calculateRank(data, player, "Goals");
  player.assistsRank = calculateRank(data, player, "Assists");
  player.contributionsRank = calculateRank(data, player, "GoalContributions");
  player.contributionsPerGameRank = calculateRank(data, player, "Efficiency");
}

function renderPlayerInfo(player) {
  // do DOM stuff
  playerDescEl.innerHTML = `
    <span class="descr">Position(s): </span> ${player.Position}
    <br>
    <span class="descr">Date of Birth: </span> 
    <br>
    <span class="descr">Height: </span> 
  `;
  playerPicEl.innerHTML = `
    <img src="./images/Players/${player.Player}.jpg" alt="" class=playerPics>
  `;
}

function renderPlayerCharts(player) {
  if (chartsRendered) return;
  const goalTypeChart = createGoalTypeChart(player);
  const goalTypeChart2 = createGoalTypeChart2(player);
  chartsRendered = true;
}

function renderPlayerBadges(player) {
  gamesPlayedEl.innerHTML = player.GamesPlayed;
  goalsScoredEl.innerHTML = player.Goals;
  assistsMadeEl.innerHTML = player.Assists;
  goalContributionsMadeEl.innerHTML = player.GoalContributions;
  goalContributionsPerGameEl.innerHTML = player.Efficiency;
}

function renderPlayerBadgesRank(player) {
  renderBadge("gamesPlayedRank");
  // goalsRankEl.innerHTML += player.GamesRank;
  renderBadge("goalsRank");
  // assistsRankEl.innerHTML += player.AssistsRank;
  renderBadge("assistsRank");
  // goalsRankEl.innerHTML += player.GoalsRank;
  renderBadge("contributionsRank");
  renderBadge("contributionsPerGameRank");
}

function appendTeamData(player) {
  if (typeof player.Teams !== "string") return;
  player.Teams = (player.Teams || "").split(",").map((s) => s.trim());
  player.GoalsByTeam = (player.GoalsByTeam || "")
    .split(",")
    .map((s) => parseInt(s.trim()) || 0);
  player.GamesByTeam = (player.GamesByTeam || "")
    .split(",")
    .map((s) => parseInt(s.trim()) || 0);
  player.AssistsByTeam = (player.AssistsByTeam || "")
    .split(",")
    .map((s) => parseInt(s.trim()) || 0);
}

function appendTableRows(player) {
  if (tablesRendered) return;
  const totals = {
    games: 0,
    goals: 0,
    assists: 0,
    goalsAndAssists: 0,
    goalsAndAssistsDivGames: 0,
  };
  player.Teams.forEach((team, teamIndex) => {
    const { games, goals, assists, goalsAndAssists, goalsAndAssistsDivGames } =
      createTableRow(player, team, teamIndex);
    totals.games += games;
    totals.goals += goals;
    totals.assists += assists;
    totals.goalsAndAssists += goalsAndAssists;
    totals.goalsAndAssistsDivGames += goalsAndAssistsDivGames;
  });
  createTotalsRow(totals, player.Teams.length);
  tablesRendered = true;
}

function createTotalsRow(totals, length) {
  const goalsGamesRatio = (
    (totals.goals + totals.assists) /
    totals.games
  ).toFixed(2);

  tbody.insertAdjacentHTML(
    "beforeend",
    `
    <tr class="totalsRowProfile">
      <th>TOTALS</th>
      <td>${totals.games}</td>
      <td>${totals.goals}</td>
      <td>${totals.assists}</td>
      <td>${totals.goalsAndAssists}</td>
      <td>${goalsGamesRatio}</td>
    </tr>
  `
  );
}

function createTableRow(player, team, teamIndex) {
  const goals = player.GoalsByTeam[teamIndex];
  const assists = player.AssistsByTeam[teamIndex];
  const goalsAndAssists = goals + assists;
  const games = player.GamesByTeam[teamIndex];
  const goalsAndAssistsDivGames = (goals + assists) / games;
  const teamLogoSrc = `./images/teams/${team}.png`;

  tbody.insertAdjacentHTML(
    "beforeend",
    `
      <tr>
        <td><img src="${teamLogoSrc}" alt="logo of ${team}" class="team-logo" loading="lazy"></td>
        <td>${games}</td>
        <td>${goals}</td>
        <td>${assists}</td>
        <td>${goalsAndAssists}</td>
        <td>${goalsAndAssistsDivGames.toFixed(2)}</td>
      </tr>
    `
  );

  return { games, goals, assists, goalsAndAssists, goalsAndAssistsDivGames };
}
