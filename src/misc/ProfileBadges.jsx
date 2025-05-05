import PlayerBadge from "./PlayerBadge.jsx";
// import ShownBadgesFilter from "../layout/ShownBadgesFilter.jsx"
import { usePlayerContext } from "../context/PlayerContext.jsx";
import { futbolDataTypes } from "../utilities/futbolDataTypes.jsx";

function ProfileBadges({ player }) {
  const { shownBadges } = usePlayerContext();

  // const badges = [
  //     {id: "games", title: "Games", value: player.GamesPlayed, rank: player.gamesPlayedRank},
  //     {id: "goals", title: "Goals", value: player.Goals, rank: player.goalsRank},
  //     {id: "assists", title: "Assists", value: player.Assists, rank: player.assistsRank},
  //     {id: "contributions", title: "Goals + Assists", value: player.GoalContributions, rank: player.contributionsRank},
  //     {id: "efficiency", title: "G + A / Games", value: player.Efficiency, rank: player.contributionsPerGameRank, colors: ['rgb(255, 79, 139, 0.1)', 'var(--pink)']},
  //     {id: "balon1", title: "Balón (1st)", value: player[`Balon (1st)`], rank: 1, colors: ['rgb(255, 79, 139, 0.1)', 'var(--pink)']},
  //     {id: "balon2", title: "Balón (2nd)", value: player[`Balon (2nd)`], rank: 1, colors: ['rgb(255, 79, 139, 0.1)', 'var(--pink)']},
  //     {id: "balon3", title: "Balón (3rd)", value: player[`Balon (3rd)`], rank: 1, colors: ['rgb(255, 79, 139, 0.1)', 'var(--pink)']},
  // ]

  return (
    <div className="profileStats">
      {/* <h3 id="leaderboard-heading">
                Leaderboard
                <ShownBadgesFilter />
            </h3> */}
      {futbolDataTypes
        .filter((type) => shownBadges.includes(type.id))
        .map((type) => {
          return (
            <PlayerBadge
              key={type.id}
              title={type.label}
              value={type.getPlayerValue(player)}
              rank={type.getPlayerRank(player)}
            />
          );
        })}
    </div>
  );
}

export default ProfileBadges;
