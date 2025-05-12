function CompDaataTable({ player }) {
  // DUMMY DATA, REMOVE LATER
  const comps = [
    { name: "COMP", games: 1, goals: 1 },
    { name: "COMP", games: 1, goals: 1 },
    { name: "COMP", games: 1, goals: 1 },
    { name: "COMP", games: 1, goals: 1 },
    { name: "COMP", games: 1, goals: 1 },
    { name: "COMP", games: 1, goals: 1 },
  ];

  return (
    <div className="playerTableStats">
      <section className="table-container">
        <table className="team-data-table">
          <thead>
            <tr className="header-roww">
              <th>Comp</th>
              <th>MP</th>
              <th>G</th>
              <th>A</th>
              <th>GC</th>
              <th>GE</th>
            </tr>
          </thead>
          <tbody id="team-stats">
            {comps.map((comp) => {
              const compLogoSrc = `/images/Comps/${comp.name}.png`;
              const goalsAndAssistsDivGames =
                (comp.goals + comp.assists) / comp.games;
              return (
                <tr key={comp.name}>
                  <td className="team-logo-td">
                    <img
                      src={compLogoSrc}
                      alt={`Logo of ${comp.name}`}
                      loading="lazy"
                      className="team-logo"
                    />
                  </td>
                  <td>{comp.games}</td>
                  <td>{comp.goals}</td>
                  <td>{comp.assists}</td>
                  <td>{comp.goals + comp.assists}</td>
                  <td>{goalsAndAssistsDivGames.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="totalsRowProfile">
              <th>TOTALS</th>
              <td>{player.compTotals.games}</td>
              <td>{player.compTotals.goals}</td>
              <td>{player.compTotals.assists}</td>
              <td>{player.compTotals.contributions}</td>
              <td>{(player.compTotals.efficiency || 0).toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </section>
    </div>
  );
}

export default CompDaataTable;
