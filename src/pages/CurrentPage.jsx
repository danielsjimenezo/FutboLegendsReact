import { useState } from "react";
import "./CurrentPage.css";

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
            <span className="score">
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
            <li>Premier League</li>
            <li>La Liga</li>
            <li>Serie A</li>
            <li>Bundesliga</li>
            <li>Ligue 1</li>
            <li>Primeira Liga</li>
            <li>Eredivisie</li>
            <li>Championship</li>
            <li>MLS</li>
            <li>Liga MX</li>
          </ol>
        </section>

        {/* Center Section - Timeline */}
        <section className="timeline-section">
          <h2>Recent Matches</h2>
          <div className="vertical-timeline">
            {/* Example of using the MatchCard component */}
            <MatchCard
              homeTeam="Monaco"
              awayTeam="Marseille"
              homeScore="1"
              awayScore="1"
              competition="Premier League"
              date="May 5, 2025"
            />

            <MatchCard
              homeTeam="Barcelona"
              awayTeam="Sevilla"
              homeScore="2"
              awayScore="1"
              competition="La Liga"
              date="May 4, 2025"
            />

            <MatchCard
              homeTeam="Liverpool"
              awayTeam="Lyon"
              homeScore="3"
              awayScore="0"
              competition="Premier League"
              date="May 4, 2025"
            />

            {/* Add more match cards here following the same pattern */}

            <MatchCard
              homeTeam="PSG"
              awayTeam="Juventus"
              homeScore="2"
              awayScore="1"
              competition="MLS"
              date="April 28, 2025"
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
                  <li>
                    <span className="player-name">Erling Haaland</span>
                    <span className="stat">24 goals</span>
                  </li>
                  <li>
                    <span className="player-name">Harry Kane</span>
                    <span className="stat">22 goals</span>
                  </li>
                  <li>
                    <span className="player-name">Kylian Mbappé</span>
                    <span className="stat">21 goals</span>
                  </li>
                  <li>
                    <span className="player-name">Vinicius Jr</span>
                    <span className="stat">19 goals</span>
                  </li>
                  <li>
                    <span className="player-name">Mohamed Salah</span>
                    <span className="stat">18 goals</span>
                  </li>
                  <li>
                    <span className="player-name">Robert Lewandowski</span>
                    <span className="stat">17 goals</span>
                  </li>
                  <li>
                    <span className="player-name">Cristiano Ronaldo</span>
                    <span className="stat">16 goals</span>
                  </li>
                  <li>
                    <span className="player-name">Son Heung-min</span>
                    <span className="stat">15 goals</span>
                  </li>
                </ol>
              </div>
            )}

            {/* Top Assisters Tab */}
            {activeTab === "assisters" && (
              <div className="tab-content">
                <ol className="player-stats-list">
                  <li>
                    <span className="player-name">Kevin De Bruyne</span>
                    <span className="stat">16 assists</span>
                  </li>
                  <li>
                    <span className="player-name">Bruno Fernandes</span>
                    <span className="stat">14 assists</span>
                  </li>
                  <li>
                    <span className="player-name">Bukayo Saka</span>
                    <span className="stat">12 assists</span>
                  </li>
                  <li>
                    <span className="player-name">Lionel Messi</span>
                    <span className="stat">11 assists</span>
                  </li>
                  <li>
                    <span className="player-name">Joshua Kimmich</span>
                    <span className="stat">10 assists</span>
                  </li>
                  <li>
                    <span className="player-name">Trent Alexander-Arnold</span>
                    <span className="stat">9 assists</span>
                  </li>
                  <li>
                    <span className="player-name">Martin Ødegaard</span>
                    <span className="stat">9 assists</span>
                  </li>
                  <li>
                    <span className="player-name">Thomas Müller</span>
                    <span className="stat">8 assists</span>
                  </li>
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
