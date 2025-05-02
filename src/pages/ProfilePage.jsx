import "./ProfilePage.css"
import { useParams } from "react-router-dom"
import { usePlayerContext } from "../context/PlayerContext.jsx"
import PlayerBadge from "../misc/PlayerBadge.jsx"
import GoalTypeChart1 from "../charts/GoalTypeChart1.jsx"
import GoalTypeChart2 from "../charts/GoalTypeChart2.jsx"
import TeamDataTable from "../tables/TeamDataTable.jsx"

function ProfilePage() {
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
            <span className="descr">Date of Brith:</span>
            <br />
            <span className="descr">Height:</span>
          </div>
        </div>
        <div className="profileCharts">
          <div className="circleChart1">
            <GoalTypeChart1 id="circleChart1" player={player} />
          </div>
          <div className="circleChart2">
            <GoalTypeChart2 id="circleChart2" player={player} />
          </div>
        </div> {/* END OF .profileCharts */}
        <TeamDataTable player={player} />


        <div className="profileStats">
          <PlayerBadge
            title="Games Played"
            value={player.GamesPlayed}
            rank={player.gamesPlayedRank}
          />
          <PlayerBadge
            title="Goals Scored"
            value={player.Goals}
            rank={player.goalsRank}
          />
          <PlayerBadge
            title="Assists Made"
            value={player.Assists}
            rank={player.assistsRank}
          />
          <PlayerBadge
            title="Goals + Assists"
            value={player.GoalContributions}
            rank={player.contributionsRank}
          />
          <PlayerBadge
            title="G + A / Games"
            value={player.Efficiency}
            rank={player.contributionsPerGameRank}
            colors={['rgb(255, 79, 139, 0.1)', 'var(--pink)']}
          />
          <PlayerBadge
            title="Undefined stat"
            value={1}
            rank={1}
            colors={['rgb(255, 79, 139, 0.1)', 'var(--pink)']}
          />
          <PlayerBadge
            title="Undefined stat"
            value={1}
            rank={1}
            colors={['rgb(255, 79, 139, 0.1)', 'var(--pink)']}
          />
          <PlayerBadge
            title="Undefined stat"
            value={1}
            rank={1}
            colors={['rgb(255, 79, 139, 0.1)', 'var(--pink)']}
          />
        </div> 

    </section>
  )
}

export default ProfilePage
