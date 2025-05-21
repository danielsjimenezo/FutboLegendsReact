import { futbolDataTypes } from "../utilities/futbolDataTypes.js";

export function getFilteredPlayers(state) {
  let result = [...state.players];
  if (state.countryFilter !== "all") {
    result = result.filter((p) => p.birthCountry === state.countryFilter);
  }
  if (state.positionFilter !== "all") {
    result = result.filter((p) => p.Position === state.positionFilter);
  }
  const type = futbolDataTypes.find((t) => t.id === state.playerSort);
  return result.sort((a, b) => b[type.id] - a[type.id]);
}



function toNumber(val = "") {
  if (typeof val === "number") return val;
  return Number(val.replaceAll(",", "")) || 0;
}
