import { useState } from "react";
import PlayerMatchTable from "../../tables/PlayerMatchTable.jsx";
import PlayerGoalTable from "../../tables/PlayerGoalTable.jsx";
import StatsPlayoffsTable from "../../tables/StatsPlayoffsTable.jsx";
import StatsTeamsTable from "../../tables/StatsTeamsTable.jsx";
import SeasonTable from "../../tables/SeasonTable.jsx";
import YearTable from "../../tables/YearTable.jsx";
import Toggle from "../../misc/Toggle.jsx";

function ProfilePageTables({ player }) {
  const [matchTableShown, setMatchTableShown] = useState("match");
  const [statsTableShown, setStatsTableShown] = useState("playoffs");
  const [timeTableShown, setTimeTableShown] = useState("season");

  return (
    <section className="container">
      {/* TIME TABLES */}
      <Toggle
        option1={{ label: "By season", value: "season" }}
        option2={{ label: "By year", value: "year" }}
        onClick={(e, option) => setTimeTableShown(option.value)}
        style={{ marginBottom: "1rem" }}
      />
      {timeTableShown === "season" ? <SeasonTable player={player} /> : <YearTable />}

      {/* MATCH/GOALS */}
      <Toggle
        option1={{ label: "Matches", value: "match" }}
        option2={{ label: "Goals", value: "goal" }}
        onClick={(e, option) => setMatchTableShown(option.value)}
        style={{ marginBottom: "1rem" }}
      />
      {matchTableShown === "match" ? <PlayerMatchTable /> : <PlayerGoalTable />}

      {/* PLAYOFFS/TEAMS */}
      <Toggle
        option1={{ label: "Stats in playoffs", value: "playoffs" }}
        option2={{ label: "Stats against top teams", value: "teams" }}
        onClick={(e, option) => setStatsTableShown(option.value)}
        style={{ marginBottom: "1rem" }}
      />
      {statsTableShown === "playoffs" ? (
        <StatsPlayoffsTable />
      ) : (
        <StatsTeamsTable />
      )}
    </section>
  );
}

export default ProfilePageTables;
