import "./ProfilePage.css"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import {
  selectPlayerState,
  toggleLeaderboardCountry,
  setLeaderboardPosition,
} from "../../context/playerSlice.js"
import GoalTypeChart1 from "../../charts/GoalTypeChart1.jsx"
import GoalTypeChart2 from "../../charts/GoalTypeChart2.jsx"
import TeamDataTable from "./TeamDataTable.jsx"
import Toggle from "../../misc/Toggle.jsx"
import CompDataTable from "../../tables/CompDataTable.jsx"
import ProfileBadges from "./ProfileBadges.jsx"
import ShownBadgesFilter from "../../layout/ShownBadgesFilter.jsx"
import ProfilePageTables from "./ProfilePageTables.jsx"


function ProfilePage() {
  const [teamTableShown, setTeamTableShown] = useState("team")

  const { players, playersLoadingState, leaderboardCountry } =
    useSelector(selectPlayerState)
  const dispatch = useDispatch()
  const { id } = useParams()
  const player = players.find((p) => p.name === id.replaceAll("_", " "))

  if (playersLoadingState === "loading") {
    return (
      <>
        <p>Loading player data...</p>
      </>
    )
  }

  if (playersLoadingState === "error") {
    return (
      <>
        <p>Something went wrong.</p>
      </>
    )
  }

  if (!player) {
    return (
      <>
        <p>Player not found</p>
      </>
    )
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
            <div>
              <span className="descr">Position(s): &nbsp;</span>
              {player.positionLong}
            </div>
            <div>
              <span className="descr">Date of Birth: &nbsp;</span>
              {player.dob || "unknown"}
            </div>
            <div>
              <span className="descr">Height: &nbsp;</span>
              {player.height || "unknown"}
            </div>
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
            setTeamTableShown(option.value)
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
                dispatch(setLeaderboardPosition(option.value))
              }}
            />
            <Toggle
              option1={{ img: "/images/Icons/global_icon.png", value: "all", style: { transform: "scale(1.1)"} }}
              option2={{
                img: `/images/Flags/${player.birthCountry}.png`,
                value: "native",
              }}
              defaultValue={leaderboardCountry}
              onClick={(e, option) => {
                dispatch(toggleLeaderboardCountry())
              }}
            />
            <ShownBadgesFilter />
          </div>
        </div>
        {teamTableShown === "team" ? (
          <TeamDataTable player={player} />
        ) : (
          <CompDataTable player={player} />
        )}
        <ProfileBadges player={player} />
      </section>
      <ProfilePageTables  player={player}/>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  )
}

export default ProfilePage
