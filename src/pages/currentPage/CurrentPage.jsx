import { useState } from "react";
import "./CurrentPage.css";
import { shortenName } from "../../utilities/utilities.js";
import { Link } from "react-router-dom";
import { topScorers, topAssisters, topTeams, leagues } from "../../utilities/dummy-data.js";
import TopPlayersList from "../../misc/TopPlayersList.jsx"



function CurrentPage() {

  // Helper function to format team name for image filename
  const formatTeamNameForImage = (teamName) => {
    // Remove spaces and special characters
    return teamName.replace(/\s+/g, "");
  };

  // Example of a match card component for reusability
  const MatchCard = ({
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
    competition,
    date,
    goals, // New array of goal information
  }) => {
    const homeImagePath = `/images/Teams/${formatTeamNameForImage(
      homeTeam
    )}.png`;
    const awayImagePath = `/images/Teams/${formatTeamNameForImage(
      awayTeam
    )}.png`;

    // State to track if images loaded successfully
    const [homeImageError, setHomeImageError] = useState(false);
    const [awayImageError, setAwayImageError] = useState(false);

    return (
      <div className="timeline-item">
        <div className="timeline-date">{date}</div>
        <div className="match-card">
          <div className="teams">
            <span className="team">
              {!homeImageError ? (
                <div
                  className="team-badge"
                  style={{ backgroundImage: `url('${homeImagePath}')` }}
                  onError={() => setHomeImageError(true)}
                ></div>
              ) : (
                <div className="team-badge team-badge-fallback">
                  {homeTeam.charAt(0)}
                </div>
              )}
              <span>{homeTeam}</span>
            </span>
            <span
              className={`score ${
                parseInt(homeScore) > parseInt(awayScore)
                  ? "score-home-win"
                  : parseInt(homeScore) < parseInt(awayScore)
                  ? "score-away-win"
                  : "score-tie"
              }`}
            >
              {homeScore} - {awayScore}
            </span>
            <span className="team">
              <span>{awayTeam}</span>
              {!awayImageError ? (
                <div
                  className="team-badge"
                  style={{ backgroundImage: `url('${awayImagePath}')` }}
                  onError={() => setAwayImageError(true)}
                ></div>
              ) : (
                <div className="team-badge team-badge-fallback">
                  {awayTeam.charAt(0)}
                </div>
              )}
            </span>
          </div>

          {/* New goals section */}
          {goals && goals.length > 0 && (
            <div className="goals-section">
              {goals.map((goal, index) => (
                <div
                  key={index}
                  className={`goal-item ${
                    goal.team === homeTeam ? "home-goal" : "away-goal"
                  }`}
                >
                  {goal.team === homeTeam ? (
                    // Home team goals (left-aligned)
                    <>
                      <span className="goal-minute">{goal.minute}'</span>
                      <div
                        className="goal-scorer-image"
                        style={{
                          backgroundImage: `url('/images/Players/${goal.scorer}.jpg')`,
                        }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.style.backgroundColor =
                            "rgba(255, 255, 255, 0.1)";
                          e.target.textContent = goal.scorer.charAt(0);
                        }}
                      ></div>
                      <span className="goal-scorer">{goal.scorer}</span>
                      {goal.penalty && <span className="goal-type">(P)</span>}
                      {goal.ownGoal && <span className="goal-type">(OG)</span>}
                    </>
                  ) : (
                    // Away team goals (right-aligned)
                    <>
                      {goal.penalty && <span className="goal-type">(P)</span>}
                      {goal.ownGoal && <span className="goal-type">(OG)</span>}
                      <span className="goal-scorer">{goal.scorer}</span>
                      <div
                        className="goal-scorer-image"
                        style={{
                          backgroundImage: `url('/images/Players/${goal.scorer}.jpg')`,
                        }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.style.backgroundColor =
                            "rgba(255, 255, 255, 0.1)";
                          e.target.textContent = goal.scorer.charAt(0);
                        }}
                      ></div>
                      <span className="goal-minute">{goal.minute}'</span>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="competition">{competition}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="current-page-container container">
      <div className="current-page">
        {/* Left Section - Top Leagues */}
        <section className="leagues-section">
          <h2>Top Leagues</h2>
          <ol className="leagues-list list">
            {leagues.map(league => (
              <li className="league" key={league.id}>
                <Link to={`/league/${league.id}`}>
                  <img src={league.img} />
                  <p>{league.name}</p>
                </Link>
              </li>
            ))}
          </ol>
        </section>

        {/* Center Section - Timeline */}
        <section className="timeline-section">
          <h2>Recent Matches</h2>
          <div className="vertical-timeline">
            <MatchCard
              homeTeam="Monaco"
              awayTeam="Marseille"
              homeScore="1"
              awayScore="1"
              competition="Premier League"
              date="May 5, 2025"
              goals={[
                { scorer: "Lionel Messi", team: "Monaco", minute: 37 },
                { scorer: "Aubameyang", team: "Marseille", minute: 82 },
              ]}
            />

            <MatchCard
              homeTeam="Barcelona"
              awayTeam="Sevilla"
              homeScore="2"
              awayScore="1"
              competition="La Liga"
              date="May 4, 2025"
              goals={[
                { scorer: "Robert Lewandowski", team: "Barcelona", minute: 24 },
                { scorer: "Raphinha", team: "Barcelona", minute: 63 },
                { scorer: "Samir Nasri", team: "Sevilla", minute: 75 },
              ]}
            />

            <MatchCard
              homeTeam="Liverpool"
              awayTeam="Lyon"
              homeScore="3"
              awayScore="0"
              competition="Premier League"
              date="May 4, 2025"
              goals={[
                {
                  scorer: "Mohamed Salah",
                  team: "Liverpool",
                  minute: 12,
                  penalty: true,
                },
                { scorer: "Luis Diaz", team: "Liverpool", minute: 45 },
                { scorer: "Darwin Nuñez", team: "Liverpool", minute: 78 },
              ]}
            />

            <MatchCard
              homeTeam="PSG"
              awayTeam="Juventus"
              homeScore="2"
              awayScore="1"
              competition="MLS"
              date="April 28, 2025"
              goals={[
                { scorer: "Kylian Mbappe", team: "PSG", minute: 14 },
                { scorer: "Ousmane Dembele", team: "PSG", minute: 56 },
                { scorer: "Alvaro Morata", team: "Juventus", minute: 68 },
              ]}
            />
          </div>
        </section>

        {/* Right Column Container */}
        <div className="right-column">
          {/* Stats Section with height limit */}
          <TopPlayersList scorers={topScorers} assisters={topAssisters} />

          {/* Most Wins section */}
          <section className="wins-section">
            <h2>Most Wins</h2>
            <ol className="team-stats-list">
              {topTeams.map((team) => (
                <li key={team.name}>
                  <div
                    className="player-image"
                    style={{
                      backgroundImage: `url("/images/Teams/${team.name}.png")`,
                    }}
                  ></div>
                  <span className="team-name">{shortenName(team.name)}</span>
                  <span className="stat">{team.stat}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
}

export default CurrentPage;
