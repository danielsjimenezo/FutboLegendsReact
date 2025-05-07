import { futbolDataTypes } from "../utilities/futbolDataTypes.jsx";

export function getFilteredPlayers(state) {
  let result = [...state.players];
  if (state.countryFilter !== "all") {
    result = result.filter((p) => p.birthCountry === state.countryFilter);
  }
  if (state.positionFilter !== "all") {
    result = result.filter((p) => p.Position === state.positionFilter);
  }
  const type = futbolDataTypes.find((t) => t.id === state.playerSort);
  return result.sort((a, b) => type.sortAlg(a, b));
}

export function getMaxValues(allPlayers) {
  const maxValues = {};

  const allGamesPlayed = allPlayers.map((p) => toNumber(p.GamesPlayed));
  maxValues.games = Math.max(...allGamesPlayed);

  const allGoals = allPlayers.map((p) => toNumber(p.Goals));
  maxValues.goals = Math.max(...allGoals);

  const allAssists = allPlayers.map((p) => toNumber(p.Assists));
  maxValues.assists = Math.max(...allAssists);

  const allContributions = allPlayers.map((p) => toNumber(p.GoalContributions));
  maxValues.contributions = Math.max(...allContributions);

  const allEfficiencies = allPlayers.map((p) => toNumber(p.Efficiency));
  maxValues.efficiency = Math.max(...allEfficiencies);

  const allBalon1 = allPlayers.map((p) => toNumber(p["Balon (1st)"]));
  const allBalon2 = allPlayers.map((p) => toNumber(p["Balon (2nd)"]));
  const allBalon3 = allPlayers.map((p) => toNumber(p["Balon (3rd)"]));
  maxValues.balon1 = Math.max(...allBalon1);
  maxValues.balon2 = Math.max(...allBalon2);
  maxValues.balon3 = Math.max(...allBalon3);

  return maxValues;
}

function toNumber(val = "") {
  if (typeof val === "number") return val;
  return Number(val.replaceAll(",", "")) || 0;
}
