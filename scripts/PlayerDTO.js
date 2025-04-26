////////// Main function

export default function toPlayerDTO(player, players) {
    const dto = {...player}
    dto.GamesPlayed = toNumber(dto.GamesPlayed)
  

    appendTeamData(dto)
    appendPlayerRankings(dto, players)
    
    delete dto[""]
    delete dto["__1"]

    return dto
}

////////// Helper functions
function appendTeamData(dto) {
  if (typeof dto.Teams !== "string") {
    dto.Teams = []
  } else {
    dto.Teams = dto.Teams.split(',').map(n => n.trim())
  }

  dto.GoalsByTeam = dto.GoalsByTeam.split(',').map(v => parseInt(v.trim()) || 0)
  dto.AssistsByTeam = dto.AssistsByTeam.split(',').map(v => parseInt(v.trim()) || 0)
  dto.GamesByTeam = dto.GamesByTeam.split(',').map(v => parseInt(v.trim()) || 0)

  dto.teams = []

  dto.Teams.forEach((team, i) => {
    const teamObj = {
      name: team,
      goals: parseInt(dto.GoalsByTeam[i]) || 0,
      games: parseInt(dto.GamesByTeam[i]) || 0,
      assists: parseInt(dto.AssistsByTeam[i]) || 0,
    }

    dto.teams.push(teamObj)
  })

  delete dto.Teams
  delete dto.GoalsByTeam
  delete dto.AssistsByTeam
  delete dto.GamesByTeam

  dto.teamTotals = {
    games: 0,
    goals: 0,
    assists: 0,
    contributions: 0,
    efficiency: 0
  }

  dto.teams.forEach(team => {
    dto.teamTotals.games += team.games
    dto.teamTotals.goals += team.goals
    dto.teamTotals.assists += team.assists
    dto.teamTotals.contributions += team.goals + team.assists
    dto.teamTotals.efficiency += (parseInt(team.goals + team.assists) / parseInt(team.games))
  })

  dto.teamTotals.efficiency = dto.teamTotals.contributions / dto.teamTotals.games

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