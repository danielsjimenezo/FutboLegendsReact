import BelowImageTable from "./BelowImageTable.jsx"

function TeamDataTable({ player }) {
  return (
    <BelowImageTable
      headings={["Team", "MP", "G", "A", "GC", "GE"]}
      rows={player.teams.map((team) => {
        const key = `team-${team.name}`
        return {
          key,
          items: [
            {
              type: "logo",
              name: team.name,
              img: `/images/Teams/${team.name}.png`,
            },
            { value: team.games },
            { value: team.goals },
            { value: team.assists },
            { value: team.goals + team.assists },
            {
              value: ((team.goals + team.assists) / team.games).toFixed(2),
            },
          ],
        }
      })}
      totals={[
        player.teamTotals.games,
        player.teamTotals.goals,
        player.teamTotals.assists,
        player.teamTotals.contributions,
        (player.teamTotals.efficiency || 0).toFixed(2),
      ]}
      gtc="1.3fr 1fr 1fr 1fr 1fr 1fr"
    />
  )
}

export default TeamDataTable
