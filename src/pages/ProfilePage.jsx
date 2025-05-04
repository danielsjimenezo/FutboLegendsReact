import "./ProfilePage.css"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { usePlayerContext } from "../context/PlayerContext.jsx"
import PlayerBadge from "../misc/PlayerBadge.jsx"
import GoalTypeChart1 from "../charts/GoalTypeChart1.jsx"
import GoalTypeChart2 from "../charts/GoalTypeChart2.jsx"
import TeamDataTable from "../tables/TeamDataTable.jsx"
import TeamDataTableToggle from "../misc/TeamDataTableToggle.jsx"
import CompDataTable from "../tables/CompDataTable.jsx"
import ProfileBadges from "../misc/ProfileBadges.jsx"
import ShownBadgesFilter from "../layout/ShownBadgesFilter.jsx"

function ProfilePage() {
  const [tableShown, setTableShown] = useState('team')
  const toggleTableShown = () => setTableShown(tableShown === 'team' ? 'comp' : 'team');
  const { players, playersLoadingState } = usePlayerContext()
  const { id } = useParams()
  const player = players.find(p => p.Player === id.replaceAll('_', ' '))

  if (playersLoadingState === 'loading') {
    return (
      <>
        <p>Loading player data...</p>
      </>
    )
  }

  if (playersLoadingState === 'error') {
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
    <section className="profile-container container">
        <div className="playerProfile">
          <h1>{player.Player}</h1>
          <div className="playerPic">
            <img src={`/images/Players/${player.Player}.jpg`} alt={`Photo of ${player.Player}`} className="playerPics" />
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
        </div> {/* END OF .profileCharts */}


        <TeamDataTableToggle tableShown={tableShown} fn={toggleTableShown} />

        <h3 id="leaderboard-heading">
            Leaderboard
            <ShownBadgesFilter />
        </h3>

        {tableShown === 'team' ? (
          <TeamDataTable player={player} />
        ): (
          <CompDataTable player={player} />
        )}


        <ProfileBadges player={player} />

    </section>
  )
}

export default ProfilePage
