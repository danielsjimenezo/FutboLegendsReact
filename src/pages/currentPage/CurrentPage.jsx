import { useState } from "react";
import "./CurrentPage.css";
import { shortenName } from "../../utilities/utilities.js";
import { Link } from "react-router-dom";
import {
  topScorers,
  topAssisters,
  topTeams,
  leagues,
} from "../../utilities/dummy-data.js";
import TopPlayersList from "../../misc/TopPlayersList.jsx";
import MatchCard from "./MatchCard.jsx";

function CurrentPage() {



  return (
    <div className="current-page-container container">
      <div className="current-page">
        {/* Left Section - Top Leagues */}
        <section className="leagues-section">
          <h2>Top Leagues</h2>
          <ol className="leagues-list list">
            {leagues.map((league) => (
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
