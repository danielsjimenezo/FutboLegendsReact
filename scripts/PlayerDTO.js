////////// Main function

export default function toPlayerDTO(player, players) {
    const dto = {...player}

    appendTeamData(dto)
    appendPlayerRankings(dto, players)
    
    delete dto[""]
    delete dto["__1"]

    return dto
}

////////// Helper functions
function appendTeamData(dto) {
  if (typeof dto.Teams !== "string") return;
  dto.Teams = (dto.Teams || "").split(",").map((s) => s.trim());
  dto.GoalsByTeam = (dto.GoalsByTeam || "")
    .split(",")
    .map((s) => parseInt(s.trim()) || 0);
  dto.GamesByTeam = (dto.GamesByTeam || "")
    .split(",")
    .map((s) => parseInt(s.trim()) || 0);
  dto.AssistsByTeam = (dto.AssistsByTeam || "")
    .split(",")
    .map((s) => parseInt(s.trim()) || 0);

}


function appendPlayerRankings(dto, players) {
  dto.gamesPlayedRank = calculateRank(dto, players, "GamesPlayed");
  dto.goalsRank = calculateRank(dto, players, "Goals");
  dto.assistsRank = calculateRank(dto, players, "Assists");
  dto.contributionsRank = calculateRank(dto, players, "GoalContributions");
  dto.contributionsPerGameRank = calculateRank(dto, players, "Efficiency");
}

function calculateRank(dto, players, key, birthCountry) {
  let rankings = [...players].sort((a, b) => {
    // Number("1,001") -> NaN
    return toNumber(b[key]) - toNumber(a[key]);
  });

  if (birthCountry !== undefined) {
    rankings = rankings.filter((p) => p.birthCountry === birthCountry);
  }

  const index = rankings.findIndex((p) => p.Player === dto.Player);

  return index + 1;
}

function toNumber(val) {
  if (typeof val === "number") return val;
  return Number(val.replaceAll(",", "")) || 0;
}