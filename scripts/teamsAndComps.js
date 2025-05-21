export default function appendTeamAndCompData(p, players) {


    let dto = {...p}

    appendTeamData(dto)
    appendCompData(dto)

    return dto
}

// /////////


function appendTeamData(dto) {
  const teamNames = dto.teams?.split(',').map(s => s.trim()) || []

  dto.goalsByTeam = dto.goalsByTeam.split(',').map(v => parseInt(v.trim()) || 0)
  dto.assistsByTeam = dto.assistsByTeam.split(',').map(v => parseInt(v.trim()) || 0)
  dto.gamesByTeam = dto.gamesByTeam.split(',').map(v => parseInt(v.trim()) || 0)

  dto.teams = []

  teamNames.forEach((team, i) => {
    const teamObj = {
      name: team,
      goals: parseInt(dto.goalsByTeam[i]) || 0,
      games: parseInt(dto.gamesByTeam[i]) || 0,
      assists: parseInt(dto.assistsByTeam[i]) || 0,
    }

    dto.teams.push(teamObj)
  })

  delete dto.goalsByTeam
  delete dto.assistsByTeam
  delete dto.gamesByTeam

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
  const compNames = dto.comps?.split(',').map(n => n.trim()) || []
  

  dto.goalsByComp = (dto.goalsByComp||"").split(',').map(v => parseInt(v.trim()) || 0)
  dto.assistsByComp = (dto.assistsByComp||"").split(',').map(v => parseInt(v.trim()) || 0)
  dto.gamesByComp = (dto.gamesByComp||"").split(',').map(v => parseInt(v.trim()) || 0)

  dto.comps = [];

  compNames.forEach((team, i) => {
    const compObj = {
      name: team,
      goals: parseInt(dto.goalsByComp[i]) || 0,
      games: parseInt(dto.gamesByComp[i]) || 0,
      assists: parseInt(dto.assistsByComp[i]) || 0,
    }

    dto.comps.push(compObj)
  })
  
  delete dto.goalsByComp
  delete dto.assistsByComp
  delete dto.gamesByComp

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
