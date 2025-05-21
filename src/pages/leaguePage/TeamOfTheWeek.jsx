function TeamOfTheWeek({ players }) {
    console.log({players})
    return (
        <section className="team-of-the-week">
            <h3>Team of the Week</h3>
            <ol className="players list">
                {players.map(p => (
                    <li key={p.name} className="player">
                        <img src={`/images/Players/${p.name}.jpg`} />
                        <p>{p.name}</p>
                    </li>
                ))}
            </ol>
        </section>
    )
}

export default TeamOfTheWeek;