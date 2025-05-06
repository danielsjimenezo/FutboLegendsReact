import { useState } from "react";
import "./CurrentPage.css";

function CurrentPage() {
  const [activeTab, setActiveTab] = useState("scorers");

  return (
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
          <div className="timeline-item">
            <div className="timeline-date">May 5, 2025</div>
            <div className="match-card">
              <div className="teams">
                <span className="team">Newcastle</span>
                <span className="score">1 - 1</span>
                <span className="team">Tottenham</span>
              </div>
              <div className="competition">Premier League</div>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-date">May 4, 2025</div>
            <div className="match-card">
              <div className="teams">
                <span className="team">Barcelona</span>
                <span className="score">2 - 1</span>
                <span className="team">Real Madrid</span>
              </div>
              <div className="competition">La Liga</div>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-date">May 4, 2025</div>
            <div className="match-card">
              <div className="teams">
                <span className="team">Liverpool</span>
                <span className="score">3 - 0</span>
                <span className="team">West Ham</span>
              </div>
              <div className="competition">Premier League</div>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-date">May 3, 2025</div>
            <div className="match-card">
              <div className="teams">
                <span className="team">Manchester City</span>
                <span className="score">3 - 0</span>
                <span className="team">Arsenal</span>
              </div>
              <div className="competition">Premier League</div>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-date">May 3, 2025</div>
            <div className="match-card">
              <div className="teams">
                <span className="team">PSG</span>
                <span className="score">2 - 0</span>
                <span className="team">Lyon</span>
              </div>
              <div className="competition">Ligue 1</div>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-date">May 3, 2025</div>
            <div className="match-card">
              <div className="teams">
                <span className="team">Juventus</span>
                <span className="score">2 - 2</span>
                <span className="team">Inter Milan</span>
              </div>
              <div className="competition">Serie A</div>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-date">May 2, 2025</div>
            <div className="match-card">
              <div className="teams">
                <span className="team">Bayern Munich</span>
                <span className="score">4 - 2</span>
                <span className="team">Borussia Dortmund</span>
              </div>
              <div className="competition">Bundesliga</div>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-date">May 2, 2025</div>
            <div className="match-card">
              <div className="teams">
                <span className="team">Napoli</span>
                <span className="score">2 - 0</span>
                <span className="team">Roma</span>
              </div>
              <div className="competition">Serie A</div>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-date">May 1, 2025</div>
            <div className="match-card">
              <div className="teams">
                <span className="team">Atlético Madrid</span>
                <span className="score">1 - 0</span>
                <span className="team">Valencia</span>
              </div>
              <div className="competition">La Liga</div>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-date">May 1, 2025</div>
            <div className="match-card">
              <div className="teams">
                <span className="team">Ajax</span>
                <span className="score">3 - 1</span>
                <span className="team">PSV</span>
              </div>
              <div className="competition">Eredivisie</div>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-date">April 30, 2025</div>
            <div className="match-card">
              <div className="teams">
                <span className="team">Chelsea</span>
                <span className="score">2 - 1</span>
                <span className="team">Everton</span>
              </div>
              <div className="competition">Premier League</div>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-date">April 30, 2025</div>
            <div className="match-card">
              <div className="teams">
                <span className="team">AC Milan</span>
                <span className="score">1 - 1</span>
                <span className="team">Lazio</span>
              </div>
              <div className="competition">Serie A</div>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-date">April 29, 2025</div>
            <div className="match-card">
              <div className="teams">
                <span className="team">RB Leipzig</span>
                <span className="score">3 - 0</span>
                <span className="team">Union Berlin</span>
              </div>
              <div className="competition">Bundesliga</div>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-date">April 29, 2025</div>
            <div className="match-card">
              <div className="teams">
                <span className="team">Marseille</span>
                <span className="score">2 - 2</span>
                <span className="team">Monaco</span>
              </div>
              <div className="competition">Ligue 1</div>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-date">April 28, 2025</div>
            <div className="match-card">
              <div className="teams">
                <span className="team">Manchester United</span>
                <span className="score">2 - 0</span>
                <span className="team">Aston Villa</span>
              </div>
              <div className="competition">Premier League</div>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-date">April 28, 2025</div>
            <div className="match-card">
              <div className="teams">
                <span className="team">Sevilla</span>
                <span className="score">3 - 2</span>
                <span className="team">Athletic Bilbao</span>
              </div>
              <div className="competition">La Liga</div>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-date">April 28, 2025</div>
            <div className="match-card">
              <div className="teams">
                <span className="team">Porto</span>
                <span className="score">2 - 0</span>
                <span className="team">Benfica</span>
              </div>
              <div className="competition">Primeira Liga</div>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-date">April 28, 2025</div>
            <div className="match-card">
              <div className="teams">
                <span className="team">Feyenoord</span>
                <span className="score">4 - 1</span>
                <span className="team">AZ Alkmaar</span>
              </div>
              <div className="competition">Eredivisie</div>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-date">April 28, 2025</div>
            <div className="match-card">
              <div className="teams">
                <span className="team">Bayer Leverkusen</span>
                <span className="score">3 - 1</span>
                <span className="team">Eintracht Frankfurt</span>
              </div>
              <div className="competition">Bundesliga</div>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-date">April 28, 2025</div>
            <div className="match-card">
              <div className="teams">
                <span className="team">LAFC</span>
                <span className="score">2 - 1</span>
                <span className="team">LA Galaxy</span>
              </div>
              <div className="competition">MLS</div>
            </div>
          </div>
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
  );
}

export default CurrentPage;
