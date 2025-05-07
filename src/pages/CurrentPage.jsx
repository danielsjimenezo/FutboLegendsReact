import { useState } from "react";
import "./CurrentPage.css";

const formatPlayerNameForImage = (playerName) => {
  // Remove spaces, dashes, apostrophes and special characters
  return playerName.replace(/[\s'.-]/g, "");
};

const topScorers = [
  { name: "Erling Haaland", stat: "24 goals" },
  { name: "Harry Kane", stat: "22 goals" },
  { name: "Kylian Mbappé", stat: "21 goals" },
  { name: "Vinicius Jr", stat: "19 goals" },
  { name: "Mohamed Salah", stat: "18 goals" },
  { name: "Robert Lewandowski", stat: "17 goals" },
  { name: "Cristiano Ronaldo", stat: "16 goals" },
  { name: "Son Heung-min", stat: "15 goals" },
];

const topAssisters = [
  { name: "Kevin De Bruyne", stat: "16 assists" },
  { name: "Bruno Fernandes", stat: "14 assists" },
  { name: "Bukayo Saka", stat: "12 assists" },
  { name: "Lionel Messi", stat: "11 assists" },
  { name: "Joshua Kimmich", stat: "10 assists" },
  { name: "Trent Alexander-Arnold", stat: "9 assists" },
  { name: "Martin Ødegaard", stat: "9 assists" },
  { name: "Thomas Müller", stat: "8 assists" },
];

function CurrentPage() {
  const [activeTab, setActiveTab] = useState("scorers");

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
                          backgroundImage: `url('/images/Players/${goal.scorer}.png')`,
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
    <div className="current-page-container">
      <div className="current-page">
        {/* Left Section - Top Leagues */}
        <section className="leagues-section">
          <h2>Top Leagues</h2>
          <ol className="leagues-list">
            <li>
              <div
                className="league-badge"
                style={{
                  backgroundImage: `url('/images/Competitions/PremierLeague.png')`,
                }}
              ></div>
              Premier League
            </li>
            <li>
              <div
                className="league-badge"
                style={{
                  backgroundImage: `url('/images/Competitions/LaLiga.png')`,
                }}
              ></div>
              La Liga
            </li>
            <li>
              <div
                className="league-badge"
                style={{
                  backgroundImage: `url('/images/Competitions/SerieA.png')`,
                }}
              ></div>
              Serie A
            </li>
            <li>
              <div
                className="league-badge"
                style={{
                  backgroundImage: `url('/images/Competitions/Bundesliga.png')`,
                }}
              ></div>
              Bundesliga
            </li>
            <li>
              <div
                className="league-badge"
                style={{
                  backgroundImage: `url('/images/Competitions/Ligue1.png')`,
                }}
              ></div>
              Ligue 1
            </li>
            <li>
              <div
                className="league-badge"
                style={{
                  backgroundImage: `url('/images/Competitions/PrimeiraLiga.png')`,
                }}
              ></div>
              Primeira Liga
            </li>
            <li>
              <div
                className="league-badge"
                style={{
                  backgroundImage: `url('/images/Competitions/Eredivisie.png')`,
                }}
              ></div>
              Eredivisie
            </li>
            <li>
              <div
                className="league-badge"
                style={{
                  backgroundImage: `url('/images/Competitions/Championship.png')`,
                }}
              ></div>
              Championship
            </li>
            <li>
              <div
                className="league-badge"
                style={{
                  backgroundImage: `url('/images/Competitions/MLS.png')`,
                }}
              ></div>
              MLS
            </li>
            <li>
              <div
                className="league-badge"
                style={{
                  backgroundImage: `url('/images/Competitions/LigaMX.png')`,
                }}
              ></div>
              Liga MX
            </li>
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
                { scorer: "Robinho", team: "Monaco", minute: 37 },
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
                { scorer: "Lewandowski", team: "Barcelona", minute: 24 },
                { scorer: "Raphinha", team: "Barcelona", minute: 63 },
                { scorer: "En-Nesyri", team: "Sevilla", minute: 75 },
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
                  scorer: "Salah",
                  team: "Liverpool",
                  minute: 12,
                  penalty: true,
                },
                { scorer: "Diaz", team: "Liverpool", minute: 45 },
                { scorer: "Nunez", team: "Liverpool", minute: 78 },
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
                { scorer: "Mbappé", team: "PSG", minute: 14 },
                { scorer: "Dembélé", team: "PSG", minute: 56 },
                { scorer: "Chiesa", team: "Juventus", minute: 68 },
              ]}
            />
          </div>
        </section>

        {/* Right Column Container */}
        <div className="right-column">
          {/* Stats Section with height limit */}
          <section className="stats-section">
            <div className="tabs">
              <button
                className={`tab ${activeTab === "scorers" ? "active" : ""}`}
                onClick={() => setActiveTab("scorers")}
              >
                Top Scorers
              </button>
              <button
                className={`tab ${activeTab === "assisters" ? "active" : ""}`}
                onClick={() => setActiveTab("assisters")}
              >
                Top Assisters
              </button>
            </div>

            {activeTab === "scorers" && (
              <div className="tab-content">
                <ol className="player-stats-list">
                  {topScorers.map((player, index) => (
                    <li key={index}>
                      <div className="player-info">
                        <div
                          className="player-image"
                          style={{
                            backgroundImage: `url('/images/Players/${formatPlayerNameForImage(
                              player.name
                            )}.png')`,
                          }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.style.backgroundColor =
                              "rgba(255, 255, 255, 0.1)";
                            e.target.textContent = player.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("");
                          }}
                        ></div>
                        <span className="player-name">{player.name}</span>
                      </div>
                      <span className="stat">{player.stat}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Top Assisters Tab */}
            {activeTab === "assisters" && (
              <div className="tab-content">
                <ol className="player-stats-list">
                  {topAssisters.map((player, index) => (
                    <li key={index}>
                      <div className="player-info">
                        <div
                          className="player-image"
                          style={{
                            backgroundImage: `url('/images/Players/
                              ${player.name}.jpg')`,
                          }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.style.backgroundColor =
                              "rgba(255, 255, 255, 0.1)";
                            e.target.textContent = player.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("");
                          }}
                        ></div>
                        <span className="player-name">{player.name}</span>
                      </div>
                      <span className="stat">{player.stat}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </section>

          {/* Most Wins section */}
          <section className="wins-section">
            <h2>Most Wins</h2>
            <ol className="team-stats-list">
              <li>
                <span className="team-name">Manchester City</span>
                <span className="stat">27 wins</span>
              </li>
              <li>
                <span className="team-name">Real Madrid</span>
                <span className="stat">25 wins</span>
              </li>
              <li>
                <span className="team-name">Bayern Munich</span>
                <span className="stat">24 wins</span>
              </li>
              <li>
                <span className="team-name">Inter Milan</span>
                <span className="stat">23 wins</span>
              </li>
              <li>
                <span className="team-name">Arsenal</span>
                <span className="stat">22 wins</span>
              </li>
              <li>
                <span className="team-name">PSG</span>
                <span className="stat">22 wins</span>
              </li>
              <li>
                <span className="team-name">Barcelona</span>
                <span className="stat">21 wins</span>
              </li>
              <li>
                <span className="team-name">Bayer Leverkusen</span>
                <span className="stat">21 wins</span>
              </li>
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
}

export default CurrentPage;
