import "./ProfilePage.css";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectPlayerState,
  toggleLeaderboardCountry,
  setLeaderboardPosition,
} from "../../context/playerSlice.js";
import GoalTypeChart1 from "../../charts/GoalTypeChart1.jsx";
import GoalTypeChart2 from "../../charts/GoalTypeChart2.jsx";
import TeamDataTable from "../../tables/TeamDataTable.jsx";
import Toggle from "../../misc/Toggle.jsx";
import CompDataTable from "../../tables/CompDataTable.jsx";
import ProfileBadges from "./ProfileBadges.jsx";
import ShownBadgesFilter from "../../layout/ShownBadgesFilter.jsx";
import PlayerMatchTable from "../../tables/PlayerMatchTable.jsx";
import PlayerGoalTable from "../../tables/PlayerGoalTable.jsx";
import StatsPlayoffsTable from "../../tables/StatsPlayoffsTable.jsx";
import StatsTeamsTable from "../../tables/StatsTeamsTable.jsx";
import BelowImageTable from "./BelowImageTable.jsx";

function ProfilePage() {
  const [teamTableShown, setTeamTableShown] = useState("team");
  const [matchTableShown, setMatchTableShown] = useState("match");
  const [statsTableShown, setStatsTableShown] = useState("playoffs");
  const { players, playersLoadingState, leaderboardCountry } =
    useSelector(selectPlayerState);
  const dispatch = useDispatch();
  const { id } = useParams();
  const player = players.find((p) => p.name === id.replaceAll("_", " "));

  if (playersLoadingState === "loading") {
    return (
      <>
        <p>Loading player data...</p>
      </>
    );
  }

  if (playersLoadingState === "error") {
    return (
      <>
        <p>Something went wrong.</p>
      </>
    );
  }

  if (!player) {
    return (
      <>
        <p>Player not found</p>
      </>
    );
  }

  return (
    <>
      <section className="profile-container container">
        <div className="playerProfile">
          <h1>{player.name}</h1>
          <div className="playerPic">
            <img
              src={`/images/Players/${player.name}.jpg`}
              alt={`Photo of ${player.name}`}
              className={`playerPics ${player.active ? "active" : "inactive"}`}
            />
          </div>
          <div className="playerDesc">
            <span className="descr">Position(s):</span>
            {player.Position}
            <br />
            <span className="descr">Date of Birth:</span>
            <br />
            <span className="descr">Height:</span>
          </div>
        </div>
        <div className="profileCharts">
          <div className="circleChart1">
            <h3>Types of Goals</h3>
            <div className="goal-type-chart-container">
              <GoalTypeChart1 id="circleChart1" player={player} />
            </div>
          </div>
          <div className="circleChart2">
            <h3>Goal Breakdown</h3>
            <div className="goal-type-chart-container">
              <GoalTypeChart2 id="circleChart2" player={player} />
            </div>
          </div>
        </div>{" "}
        {/* END OF .profileCharts */}
        <Toggle
          option1={{
            label: "Teams",
            value: "team",
          }}
          option2={{
            label: "Comps",
            value: "comp",
          }}
          onClick={(e, option) => {
            setTeamTableShown(option.value);
          }}
        />
        <div id="leaderboard-heading">
          <h3>Leaderboard</h3>
          <div className="controls">
            <Toggle
              option1={{ label: "ALL", value: "all" }}
              option2={{ label: player.position, value: player.position }}
              defaultValue="all"
              onClick={(e, option) => {
                dispatch(setLeaderboardPosition(option.value));
              }}
            />
            <Toggle
              option1={{ img: "/images/Icons/global_icon.png", value: "all" }}
              option2={{
                img: `/images/Flags/${player.birthCountry}.png`,
                value: "native",
              }}
              defaultValue={leaderboardCountry}
              onClick={(e, option) => {
                dispatch(toggleLeaderboardCountry());
              }}
            />
            <ShownBadgesFilter />
          </div>
        </div>
        {teamTableShown === "team" ? (
          // <TeamDataTable player={player} />
          <BelowImageTable
            headings={["Team", "MP", "G", "A", "GC", "GE"]}
            rows={player.teams.map((team) => ({
              key: team.name,
              items: [
                {
                  type: "logo",
                  name: team.name,
                  img: `/images/Teams/${team.name}.png`,
                },
                { value: team.games },
                { value: team.goals },
                { value: team.assists },
                { value: team.goals + team.assists },
                {
                  value: ((team.goals + team.assists) / team.games).toFixed(2),
                },
              ],
            }))}
            totals={[
              player.teamTotals.games,
              player.teamTotals.goals,
              player.teamTotals.assists,
              player.teamTotals.contributions,
              (player.teamTotals.efficiency || 0).toFixed(2),
            ]}
          />
        ) : (
          <CompDataTable player={player} />
        )}
        <ProfileBadges player={player} />
      </section>
      <section className="container">
        <Toggle
          option1={{ label: "Matches", value: "match" }}
          option2={{ label: "Goals", value: "goal" }}
          onClick={(e, option) => setMatchTableShown(option.value)}
          style={{ marginBottom: "1rem" }}
        />
        {matchTableShown === "match" ? (
          <PlayerMatchTable />
        ) : (
          <PlayerGoalTable />
        )}
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

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
}

export default ProfilePage;
