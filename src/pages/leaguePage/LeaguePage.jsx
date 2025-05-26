import "./LeaguePage.css";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  leagues,
  topAssisters,
  topScorers,
  tacklesWon,
  cleanSheets,
  topTeams,
} from "../../utilities/dummy-data.js";
import TeamOfTheWeek from "./TeamOfTheWeek.jsx";
import TopPlayersList from "../../misc/TopPlayersList.jsx";
import { selectPlayerState } from "../../context/playerSlice.js";
import { useSelector } from "react-redux";

function LeaguePage() {
  console.log("LeaguePage component rendered");
  const [tab, setTab] = useState("Recent Matches"); // or 'League Standings'

  const { leagueId } = useParams();
  console.log("leagueId from URL:", leagueId);
  const league = leagues.find((l) => l.id == leagueId);
  console.log("found league:", league);

  const { getRandomPlayers } = useSelector(selectPlayerState);

  if (!league)
    return (
      <>
        <p>League not found. Check the URL.</p>
      </>
    );

  return (
    <>
      <div className="container league-page">
        <div className="left">
          <TeamOfTheWeek />
        </div>
        <div className="center">
          <div className="tabs">
            <button
              className={`${tab == "Recent Matches" ? "active" : ""}`}
              onClick={() => setTab("Recent Matches")}
            >
              Recent Matches
            </button>
            <button
              className={`${tab == "League Standings" ? "active" : ""}`}
              onClick={() => setTab("League Standings")}
            >
              League Standings
            </button>
          </div>
        </div>
        <div className="right">
          <TopPlayersList
            data1={topScorers}
            data2={topAssisters}
            label1="Top Scorers"
            label2="Top Assisters"
            imageFolder="Players"
          />

          <TopPlayersList
            data1={tacklesWon}
            data2={cleanSheets}
            label1="Tackles Won"
            label2="Clean Sheets"
            imageFolder="Players"
          />

          <section className="wins-section">
            <h2>Most Wins</h2>
            <ol className="team-stats-list">
              {topTeams.map((team) => (
                <li className="team-stats" key={team.name}>
                  <div className="team-info">
                    <img
                      src={`/images/Teams/${team.name.replace(/ /g, "")}.png`}
                      alt={team.name}
                      className="team-badge-wins"
                      style={
                        team.name === "Real Madrid"
                          ? { height: "28px", width: "auto" }
                          : {}
                      }
                    />
                    <p>{team.name}</p>
                  </div>
                  <p className="stat">{team.wins}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </>
  );
}

export default LeaguePage;
