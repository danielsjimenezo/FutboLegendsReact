function TeamDataTable({ player }) {
  return (
    <div className="playerTableStats">
      <section className="table-container">
        <div className="team-data-table-container">
          <table className="team-data-table">
            <thead>
              <tr className="header-roww">
                <th>Team</th>
                <th>MP</th>
                <th>G</th>
                <th>A</th>
                <th>GC</th>
                <th>GE</th>
              </tr>
            </thead>
            <tbody id="team-stats">
              {player.teams.map((team) => {
                const teamLogoSrc = `/images/Teams/${team.name}.png`;
                const goalsAndAssistsDivGames =
                  (team.goals + team.assists) / team.games;
                return (
                  <tr key={team.name}>
                    <td className="team-logo-td">
                      <img
                        src={teamLogoSrc}
                        alt={`Logo of ${team.name}`}
                        loading="lazy"
                        className="team-logo"
                      />
                    </td>
                    <td>{team.games.toLocaleString()}</td>
                    <td>{team.goals.toLocaleString()}</td>
                    <td>{team.assists.toLocaleString()}</td>
                    <td>{(team.goals + team.assists).toLocaleString()}</td>
                    <td>
                      {goalsAndAssistsDivGames.toFixed(2).toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <table className="team-data-foot">
          <tfoot>
            <tr className="totalsRowProfile">
              <th>TOTALS</th>
              <td>{player.teamTotals.games.toLocaleString()}</td>
              <td>{player.teamTotals.goals.toLocaleString()}</td>
              <td>{player.teamTotals.assists.toLocaleString()}</td>
              <td>{player.teamTotals.contributions.toLocaleString()}</td>
              <td>
                {(player.teamTotals.efficiency || 0)
                  .toFixed(2)
                  .toLocaleString()}
              </td>
            </tr>
          </tfoot>
        </table>
      </section>
    </div>
  );
}

export default TeamDataTable;
