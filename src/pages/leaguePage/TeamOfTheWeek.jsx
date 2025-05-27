function TeamOfTheWeek() {
  const players = [
    { name: "Gianluigi Buffon" },
    { name: "Marcelo" },
    { name: "Paolo Maldini" },
    { name: "Sergio Ramos" },
    { name: "Dani Alves" },
    { name: "Patrick Vieira" },
    { name: "Andres Iniesta" },
    { name: "Zinedine Zidane" },
    { name: "Lionel Messi" },
    { name: "Neymar" },
    { name: "Cristiano Ronaldo" },
  ];

  return (
    <section className="team-of-the-week">
      <h2>Team of the Week</h2>
      <ol className="players list">
        {players.map((p, index) => (
          <li key={p.name} className="player">
            <span className="player-number">{index + 1}</span>
            <img src={`/images/Players/${p.name}.jpg`} />
            <p>{p.name}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default TeamOfTheWeek;
