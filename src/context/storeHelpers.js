import { futbolDataTypes } from "../utilities/futbolDataTypes.jsx";

export function getFilteredPlayers(state) {
  let result = [...state.players];
  if (state.countryFilter !== 'all') {
    result = result.filter(p => p.birthCountry === state.countryFilter);
  }
  if (state.positionFilter !== 'all') {
    result = result.filter(p => p.Position === state.positionFilter);
  }
  const type = futbolDataTypes.find((t) => t.id === state.playerSort);
  return result.sort((a, b) => type.sortAlg(a, b));
}

export function getMaxValues(allPlayers) {
  const maxValues = {};

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

  const allBalon1 = allPlayers.map((p) => toNumber(p["Balon (1st)"]));
  const allBalon2 = allPlayers.map((p) => toNumber(p["Balon (2nd)"]));
  const allBalon3 = allPlayers.map((p) => toNumber(p["Balon (3rd)"]));

  maxValues.Balon = [
    Math.max(...allBalon1),
    Math.max(...allBalon2),
    Math.max(...allBalon3),
  ];

  return maxValues;
}

function toNumber(val = "") {
  if (typeof val === "number") return val;
  return Number(val.replaceAll(",", "")) || 0;
}
