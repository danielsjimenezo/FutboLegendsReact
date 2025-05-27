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
import MatchCard from "../currentPage/MatchCard.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LeagueStandingsTable from "../../tables/LeagueStandingsTable.jsx";

function LeaguePage() {
  console.log("LeaguePage component rendered");
  const [tab, setTab] = useState("Recent Matches"); // or 'League Standings'
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const { leagueId } = useParams();
  console.log("leagueId from URL:", leagueId);
  const league = leagues.find((l) => l.id == leagueId);
  console.log("found league:", league);

  const { getRandomPlayers } = useSelector(selectPlayerState);

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

  // Dummy data for league standings (replace with actual data fetching later)
  const dummyStandings = [
    {
      name: "Liverpool",
      badge: "/images/Teams/Liverpool.png",
      played: 38,
      goalDifference: 45,
      goalsFor: 86,
      goalsAgainst: 41,
      points: 84,
      form: ["W", "L", "D", "L", "D"],
    },
    {
      name: "Arsenal",
      badge: "/images/Teams/Arsenal.png",
      played: 38,
      goalDifference: 35,
      goalsFor: 69,
      goalsAgainst: 34,
      points: 74,
      form: ["D", "L", "D", "W", "W"],
    },
    {
      name: "Manchester City",
      badge: "/images/Teams/Manchester City.png",
      played: 38,
      goalDifference: 28,
      goalsFor: 72,
      goalsAgainst: 44,
      points: 71,
      form: ["W", "W", "D", "W", "W"],
    },
    {
      name: "Chelsea",
      badge: "/images/Teams/Chelsea.png",
      played: 38,
      goalDifference: 21,
      goalsFor: 64,
      goalsAgainst: 43,
      points: 69,
      form: ["W", "W", "L", "W", "W"],
    },
    {
      name: "Newcastle United",
      badge: "/images/Teams/Newcastle United.png",
      played: 38,
      goalDifference: 21,
      goalsFor: 68,
      goalsAgainst: 47,
      points: 66,
      form: ["W", "D", "W", "L", "L"],
    },
    {
      name: "Aston Villa",
      badge: "/images/Teams/Aston Villa.png",
      played: 38,
      goalDifference: 7,
      goalsFor: 58,
      goalsAgainst: 51,
      points: 66,
      form: ["L", "W", "W", "W", "L"],
    },
    {
      name: "Nottingham Forest",
      badge: "/images/Teams/Nottingham Forest.png",
      played: 38,
      goalDifference: 12,
      goalsFor: 58,
      goalsAgainst: 46,
      points: 65,
      form: ["L", "D", "D", "W", "L"],
    },
    {
      name: "Brighton & Hove Albion",
      badge: "/images/Teams/Brighton & Hove Albion.png",
      played: 38,
      goalDifference: 7,
      goalsFor: 66,
      goalsAgainst: 59,
      points: 61,
      form: ["W", "D", "W", "W", "W"],
    },
    {
      name: "AFC Bournemouth",
      badge: "/images/Teams/AFC Bournemouth.png",
      played: 38,
      goalDifference: 12,
      goalsFor: 58,
      goalsAgainst: 46,
      points: 56,
      form: ["D", "W", "L", "L", "W"],
    },
    {
      name: "Brentford",
      badge: "/images/Teams/Brentford.png",
      played: 38,
      goalDifference: 9,
      goalsFor: 66,
      goalsAgainst: 57,
      points: 56,
      form: ["W", "W", "W", "L", "D"],
    },
    {
      name: "Fulham",
      badge: "/images/Teams/Fulham.png",
      played: 38,
      goalDifference: 0,
      goalsFor: 54,
      goalsAgainst: 54,
      points: 54,
      form: ["W", "L", "L", "W", "L"],
    },
    {
      name: "Crystal Palace",
      badge: "/images/Teams/Crystal Palace.png",
      played: 38,
      goalDifference: 0,
      goalsFor: 51,
      goalsAgainst: 51,
      points: 53,
      form: ["D", "D", "W", "W", "D"],
    },
  ];

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
          {tab === "Recent Matches" && (
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
                  goals={[
                    {
                      scorer: "Robert Lewandowski",
                      team: "Barcelona",
                      minute: 24,
                    },
                    { scorer: "Luis Suarez", team: "Barcelona", minute: 63 },
                    { scorer: "Neymar", team: "Sevilla", minute: 75 },
                  ]}
                />

                <MatchCard
                  homeTeam="Liverpool"
                  awayTeam="Lyon"
                  homeScore="3"
                  awayScore="0"
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
                  goals={[
                    { scorer: "Kylian Mbappe", team: "PSG", minute: 14 },
                    { scorer: "Ousmane Dembele", team: "PSG", minute: 56 },
                    { scorer: "Alvaro Morata", team: "Juventus", minute: 68 },
                  ]}
                />
              </div>
            </section>
          )}

          {tab === "League Standings" && (
            <section>
              <LeagueStandingsTable standingsData={dummyStandings} />
            </section>
          )}
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
        </div>
      </div>
    </>
  );
}

export default LeaguePage;
