import { fetchData } from "/Javascript/Utilities/fetchData.js";
import loadComponent from "../../components/loadComponents.js";
import { onClickOutside } from "../Utilities/defineFilterHandlers.js";
import { toNumber } from "../Utilities/toNumber.js";
await loadComponent("header", "header");

document.querySelector("#compareButtonn").classList.add("selected");

const searchInputEls = document.querySelectorAll(".compare-search");
const searchResultEls = document.querySelectorAll(".compare-search-results");
const comparePictures = document.querySelectorAll(".compare-picture");
const compareBars = document.getElementById("compare-stats");

const players = [];
const maxValues = {};

searchInputEls[0].addEventListener("keyup", (e) => {
  if (e.key !== "Enter") return;
  search(0);
});

searchInputEls[1].addEventListener("keyup", (e) => {
  if (e.key !== "Enter") return;
  search(1);
});

onClickOutside(searchInputEls[0], hideSearch);
onClickOutside(searchInputEls[1], hideSearch);

loadDefaults();

// ///////////////

function getMaxValues(allPlayers) {
  //
  const allGamesPlayed = allPlayers.map((p) => toNumber(p.GamesPlayed));
  maxValues.GamesPlayed = Math.max(...allGamesPlayed);

  const allGoals = allPlayers.map((p) => toNumber(p.Goals));
  maxValues.Goals = Math.max(...allGoals);

  const allAssists = allPlayers.map((p) => toNumber(p.Assists));
  maxValues.Assists = Math.max(...allAssists);

  const allContributions = allPlayers.map((p) => toNumber(p.GoalContributions));
  maxValues.GoalContributions = Math.max(...allContributions);

  const allEfficiencies = allPlayers.map((p) => toNumber(p.Efficiency));
  maxValues.Efficiency = Math.max(...allEfficiencies);

  console.log("maxValues:", maxValues);
}

function hideSearch() {
  searchResultEls[0].innerHTML = "";
  searchResultEls[1].innerHTML = "";
}

async function search(i) {
  const query = searchInputEls[i].value.toLowerCase();
  const data = await fetchData();
  getMaxValues(data);
  const results = data.filter((player) =>
    player.Player.toLowerCase().includes(query)
  );
  displaySearchResults(results, i);
}

function displaySearchResults(results, i) {
  searchResultEls[i].innerHTML = "";

  if (results.length === 0) {
    searchResultEls[i].innerHTML = "<p>No players found</p>";
    return;
  }

  results.forEach((player) => {
    const playerEl = document.createElement("div");
    playerEl.classList.add("player-result");
    const button = document.createElement("button");
    button.classList.add("searchResultBox");
    button.innerHTML = `
            <img src="./images/Players/${player.Player}.jpg" alt="${player.Player}" class="player-result-img">
            <div class="player-result-info">
              <p>${player.Player}</p>
            </div>
        `;
    button.addEventListener("click", () => {
      renderPlayerData(i, player);
    });
    playerEl.appendChild(button);
    searchResultEls[i].appendChild(playerEl);
  });
}

function renderPlayerData(i, player) {
  players[i] = player;
  //  [undefined, {}]
  const comparePicture = comparePictures[i];
  comparePicture.innerHTML = `
    <img src="/images/Players/${player.Player}.jpg">
  `;

  if (players[0] && players[1]) renderCompareBars();
}

function renderCompareBars() {
  const [p1, p2] = players;
  compareBars.innerHTML = "";

  const gamesBar = createCompareBar(
    "Games Played",
    toNumber(p1.GamesPlayed),
    toNumber(p2.GamesPlayed),
    maxValues.GamesPlayed
  );

  const goalsBar = createCompareBar(
    "Goals",
    toNumber(p1.Goals),
    toNumber(p2.Goals),
    maxValues.Goals
  );

  const assistsBar = createCompareBar(
    "Assists",
    toNumber(p1.Assists),
    toNumber(p2.Assists),
    maxValues.Assists
  );

  const contributionsBar = createCompareBar(
    "Goals + Assists",
    toNumber(p1.GoalContributions),
    toNumber(p2.GoalContributions),
    maxValues.GoalContributions
  );

  const contributionsPerGameBar = createCompareBar(
    "Efficiency",
    toNumber(p1.Efficiency),
    toNumber(p2.Efficiency),
    maxValues.Efficiency
  );

  compareBars.insertAdjacentHTML("beforeend", gamesBar);
  compareBars.insertAdjacentHTML("beforeend", goalsBar);
  compareBars.insertAdjacentHTML("beforeend", assistsBar);
  compareBars.insertAdjacentHTML("beforeend", contributionsBar);
  compareBars.insertAdjacentHTML("beforeend", contributionsPerGameBar);
}

//    value ? "if true" : "if false"

function createCompareBar(label, val1, val2, max) {
  console.log(val1, val2, max);
  const lengthPercent1 = (val1 / max) * 100;
  const lengthPercent2 = (val2 / max) * 100;
  const style1 = `
    width: ${lengthPercent1}%;
    background-image: linear-gradient(90deg, ${
      lengthPercent1 > lengthPercent2 ? "var(--green)" : "var(--pink)"
    }, transparent);
  `;
  const style2 = `
    width: ${lengthPercent2}%;
    background-image: linear-gradient(90deg, transparent, ${
      lengthPercent2 > lengthPercent1 ? "var(--green)" : "var(--pink)"
    });
  `;
  return `
    <div class="compare-bar">
      <div class="compare-bar-container left">
        <div class="compare-bar-value">${val1}</div>
        <div class="compare-bar-fill" style="${style1}"></div>
      </div>
      <div class="compare-bar-label">${label}</div>
      <div class="compare-bar-container right">
        <div class="compare-bar-fill" style="${style2}"></div>
        <div class="compare-bar-value">${val2}</div>
      </div>
    </div>
  `;
}

async function loadDefaults() {
  const allPlayers = await fetchData();
  getMaxValues(allPlayers);
  renderPlayerData(
    0,
    allPlayers.find((p) => p.Player === "Cristiano Ronaldo")
  );
  renderPlayerData(
    1,
    allPlayers.find((p) => p.Player === "Lionel Messi")
  );
}
