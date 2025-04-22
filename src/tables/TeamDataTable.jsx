function TeamDataTable({ player }) {
    return (
        <div className="playerTableStats">
            <section className="table-container">
                <table id="table">
                    <thead>
                        <tr className="header-roww">
                            <th>Team</th>
                            <th>MP</th>
                            <th>G</th>
                            <th>A</th>
                            <th>G+A</th>
                            <th>G+A/MP</th>
                        </tr>
                    </thead>
                    <tbody id="team-stats">
                        {player.teams.map(team => {
                            const teamLogoSrc = `/images/Teams/${team.name}.png`
                            const goalsAndAssistsDivGames = (team.goals + team.assists) / team.games;
                            return (
                                <tr key={team.name}>
                                    <td>
                                        <img src={teamLogoSrc} alt={`Logo of ${team.name}`} loading="lazy" className="team-logo" />
                                    </td>
                                    <td>{team.games}</td>
                                    <td>{team.goals}</td>
                                    <td>{team.assists}</td>
                                    <td>{team.goals + team.assists}</td>
                                    <td>{goalsAndAssistsDivGames.toFixed(2)}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                    <tfoot>
                        <tr className="totalsRowProfile">
                            <th>TOTALS</th>
                            <td>{player.teamTotals.games}</td>
                            <td>{player.teamTotals.goals}</td>
                            <td>{player.teamTotals.assists}</td>
                            <td>{player.teamTotals.contributions}</td>
                            <td>{player.teamTotals.efficiencty}</td>
                        </tr>
                    </tfoot>
                </table>
            </section>
        </div>
    )
}

export default TeamDataTable