import { useState, useEffect, useRef } from "react";
import "./CurrentPage.css";
import { shortenName } from "../../utilities/utilities.js";
import { Link } from "react-router-dom";
import {
  topScorers,
  topTeams,
  tacklesWon,
  cleanSheets,
} from "../../utilities/dummy-data.js";
import TopPlayersList from "../../misc/TopPlayersList.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TodayFixtures from "./fixtures.jsx";
import { getLeagues, getTopScorers, getTopAssists } from "../../misc/footballAPI.jsx";

function CurrentPage() {
  const [currentDate, setCurrentDate] = useState(new Date()); // Initialize with today's date
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false); // State for dropdown visibility
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const [leagues, setLeagues] = useState([]);
  const [topScorers, setTopScorers] = useState([]);
  const [topAssists, setTopAssists] = useState([]);
 

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const leaguesData = await getLeagues(); 
        setLeagues(leaguesData);
      } catch (error) {
        console.error("Error fetching leagues:", error);
      }
    };
    fetchLeagues();
  }, []);

  useEffect(() => {
    const fetchTopScorers = async () => {
      try {
        const topScorersData = await getTopScorers(leagues.map(league => league.id), "2024");
        setTopScorers(topScorersData);
      } catch (error) {
        console.error("Error fetching top scorers:", error);
      }
      console.log("topScorers");
    };
    fetchTopScorers();
  }, [leagues]);

  useEffect(() => {
    const fetchTopAssists = async () => {
      try {
        const topAssistsData = await getTopAssists(leagues.map(league => league.id), "2024");
        setTopAssists(topAssistsData);
      } catch (error) {
        console.error("Error fetching top assists:", error);
      }
      console.log("topAssists");
    };
    fetchTopAssists();  
  }, [leagues]);

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
    console.log(currentDate);
    if (currentDate.toDateString() !== today.toDateString()) {
      setCurrentDate((prevDate) => {
        const newDate = new Date(prevDate);
        newDate.setDate(prevDate.getDate() + 1);
        return newDate;
      });
    }
  };

  useEffect(() => {
    if (leftRef.current) leftRef.current.classList.add("animate-left");
    if (rightRef.current) rightRef.current.classList.add("animate-right");
  }, []);

  return (
    <div className="current-page-container container">
      <div className="current-page">
        {/* Left Section - Top Leagues */}
        <section className="leagues-section" ref={leftRef}>
          <h2>Top Competitions</h2>
          <ol className="leagues-list list">
            {leagues.map((league) => (
              <li className="league" key={league.id}>
                <Link to={`/league/${league.id}`}>
                  <img src={league.logo} />
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
            <TodayFixtures date={currentDate} />
          </div>
        </section>

        {/* Right Column Container */}
        <div className="right-column" ref={rightRef}>
          {/* Stats Section with height limit */}
          <TopPlayersList
            data1={topScorers}
            data2={topAssists}
            label1="Top Scorers"
            label2="Top Assisters"
            imageFolder="Players"
          />

          {/* New Stats Section */}
          <TopPlayersList
            data1={topScorers}
            data2={topAssists}
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
