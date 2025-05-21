

////////// Main function

export default function toPlayerDTO(player, players) {
    const dto = {...player}
    dto.GamesPlayed = toNumber(dto.GamesPlayed)
  
    dto.GoalContributions = toNumber(dto.GoalContributions)
    dto.Minutes = toNumber(dto.Minutes)

    appendTeamData(dto)
    appendCompData(dto)
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

function appendCompData(dto) {
  if (typeof dto.Comps !== "string") {
    dto.Comps = []
  } else {
    dto.Comps = dto.Comps.split(',').map(n => n.trim())
  }

  dto.GoalsByComp = (dto.GoalsByComp||"").split(',').map(v => parseInt(v.trim()) || 0)
  dto.AssistsByComp = (dto.AssistsByComp||"").split(',').map(v => parseInt(v.trim()) || 0)
  dto.GamesByComp = (dto.GamesByComp||"").split(',').map(v => parseInt(v.trim()) || 0)

  dto.comps = [];

  (dto.Comps||[]).forEach((team, i) => {
    const compObj = {
      name: team,
      goals: parseInt(dto.GoalsByComp[i]) || 0,
      games: parseInt(dto.GamesByComp[i]) || 0,
      assists: parseInt(dto.AssistsByComp[i]) || 0,
    }

    dto.Comps.push(compObj)
  })

  delete dto.Comps
  delete dto.GoalsByComp
  delete dto.AssistsByComp
  delete dto.GamesByComp

  dto.compTotals = {
    games: 0,
    goals: 0,
    assists: 0,
    contributions: 0,
    efficiency: 0
  }

  dto.comps.forEach(comp => {
    dto.compTotals.games += comp.games
    dto.compTotals.goals += comp.goals
    dto.compTotals.assists += comp.assists
    dto.compTotals.contributions += comp.goals + comp.assists
    dto.compTotals.efficiency += (parseInt(comp.goals + comp.assists) / parseInt(comp.games))
  })

  dto.compTotals.efficiency = dto.compTotals.contributions / dto.compTotals.games

}


function appendPlayerRankings(dto, players) {
  dto.gamesPlayedRank = calculateRank(dto, players, "GamesPlayed");
  dto.goalsRank = calculateRank(dto, players, "Goals");
  dto.assistsRank = calculateRank(dto, players, "Assists");
  dto.contributionsRank = calculateRank(dto, players, "GoalContributions");
  dto.contributionsPerGameRank = calculateRank(dto, players, "Efficiency");
  dto.balon1Rank = calculateRank(dto, players, "Balon (1st)");
  dto.balon2Rank = calculateRank(dto, players, "Balon (2nd)");
  dto.balon3Rank = calculateRank(dto, players, "Balon (3rd)");

  dto.gamesPlayedRankNative = calculateRank(dto, players, "GamesPlayed", true);
  dto.goalsRankNative = calculateRank(dto, players, "Goals", true);
  dto.assistsRankNative = calculateRank(dto, players, "Assists", true);
  dto.contributionsRankNative = calculateRank(dto, players, "GoalContributions", true);
  dto.contributionsPerGameRankNative = calculateRank(dto, players, "Efficiency", true);
  dto.balon1RankNative = calculateRank(dto, players, "Balon (1st)", true);
  dto.balon2RankNative = calculateRank(dto, players, "Balon (2nd)", true);
  dto.balon3RankNative = calculateRank(dto, players, "Balon (3rd)", true);
}

function calculateRank(dto, players, key, useBirthCountry) {
  let rankings = [...players].sort((a, b) => {
    // Number("1,001") -> NaN
    return toNumber(b[key]) - toNumber(a[key]);
  });

  if (useBirthCountry) {
    rankings = rankings.filter((p) => p.birthCountry === dto.birthCountry);
  }

  const index = rankings.findIndex((p) => p.name === dto.name);

  return index + 1;
}

function toNumber(val) {
  if (typeof val === "number") return val;
  return Number(val.replaceAll(",", "")) || 0;
}