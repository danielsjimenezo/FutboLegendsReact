import { useState } from "react";
import "./CurrentPage.css";
import { shortenName } from "../../utilities/utilities.js";
import { Link } from "react-router-dom";
import {
  topScorers,
  topAssisters,
  topTeams,
  leagues,
  tacklesWon,
  cleanSheets,
} from "../../utilities/dummy-data.js";
import TopPlayersList from "../../misc/TopPlayersList.jsx";
import MatchCard from "./MatchCard.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CurrentPage() {
  const [currentDate, setCurrentDate] = useState(new Date()); // Initialize with today's date
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false); // State for dropdown visibility

  const formatDisplayDate = (date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      const options = { month: "long", day: "numeric", year: "numeric" };
      return date.toLocaleDateString("en-US", options);
    }
  };

  const handlePreviousDay = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() - 1);
      return newDate;
    });
  };

  const handleNextDay = () => {
    const today = new Date();
    if (currentDate.toDateString() !== today.toDateString()) {
      setCurrentDate((prevDate) => {
        const newDate = new Date(prevDate);
        newDate.setDate(prevDate.getDate() + 1);
        return newDate;
      });
    }
  };

  return (
    <div className="current-page-container container">
      <div className="current-page">
        {/* Left Section - Top Leagues */}
        <section className="leagues-section">
          <h2>Top Competitions</h2>
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
          <div className="date-filter">
            <button className="date-nav-arrow" onClick={handlePreviousDay}>
              &lt;
            </button>
            <span
              className="current-date"
              onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
            >
              {formatDisplayDate(currentDate)}
            </span>
            <button
              className="date-nav-arrow"
              onClick={handleNextDay}
              disabled={
                currentDate.toDateString() === new Date().toDateString()
              }
            >
              &gt;
            </button>
            {isDatePickerOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: 1000,
                  backgroundColor: "#2b2b2b",
                }}
              >
                <DatePicker
                  selected={currentDate}
                  onChange={(date) => {
                    setCurrentDate(date);
                    setIsDatePickerOpen(false);
                  }}
                  inline
                  onClickOutside={() => setIsDatePickerOpen(false)}
                />
              </div>
            )}
          </div>
          <div className="vertical-timeline">
            <MatchCard
              homeTeam="Monaco"
              awayTeam="Marseille"
              homeScore="1"
              awayScore="1"
              competition="Premier League"
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
              goals={[
                { scorer: "Robert Lewandowski", team: "Barcelona", minute: 24 },
                { scorer: "Luis Suarez", team: "Barcelona", minute: 63 },
                { scorer: "Neymar", team: "Sevilla", minute: 75 },
              ]}
            />

            <MatchCard
              homeTeam="Liverpool"
              awayTeam="Lyon"
              homeScore="3"
              awayScore="0"
              competition="Premier League"
              goals={[
                {
                  scorer: "Mohamed Salah",
                  team: "Liverpool",
                  minute: 12,
                  penalty: true,
                },
                { scorer: "Kylian Mbappe", team: "Liverpool", minute: 45 },
                { scorer: "Andres Iniesta", team: "Liverpool", minute: 78 },
              ]}
            />

            <MatchCard
              homeTeam="PSG"
              awayTeam="Juventus"
              homeScore="2"
              awayScore="1"
              competition="MLS"
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
          <TopPlayersList
            data1={topScorers}
            data2={topAssisters}
            label1="Top Scorers"
            label2="Top Assisters"
            imageFolder="Players"
          />

          {/* New Stats Section */}
          <TopPlayersList
            data1={tacklesWon}
            data2={cleanSheets}
            label1="Tackles Won"
            label2="Clean Sheets"
            imageFolder="Players"
          />

          {/* Most Wins section */}
          <section className="wins-section">
            <h2>Most Wins</h2>
            <ol className="team-stats-list">
              {topTeams.map((team) => (
                <li key={team.name}>
                  <div
                    className="team-badge-wins"
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
