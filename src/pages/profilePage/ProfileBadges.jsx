import PlayerBadge from "./PlayerBadge.jsx";
import { useSelector } from "react-redux";
import { selectPlayerState } from "../../context/playerSlice.js";
import { futbolDataTypes } from "../../utilities/futbolDataTypes.js";
import { graphColors } from "../../utilities/utilities.js";

function ProfileBadges({ player }) {
  const { shownBadges, leaderboardCountry, leaderboardPosition } = useSelector(selectPlayerState);
  // console.log("leaderboardCountry", leaderboardCountry)

  return (
    <div className="profileStats">
      {/* <h3 id="leaderboard-heading">
                Leaderboard
                <ShownBadgesFilter />
            </h3> */}
      {futbolDataTypes
        .filter((type) => shownBadges.includes(type.id))
        .map((type, i) => {
          let rank
          if (leaderboardCountry === 'all') {
            if (leaderboardPosition === 'all') {
              rank = player.rankings.world[type.id]
            } else {
              rank = player.rankings.worldPosition[type.id]
            }
          } else {
            if (leaderboardPosition === 'all') {
              rank = player.rankings.country[type.id]
            } else {
              rank = player.rankings.countryPosition[type.id]
            }
          }

          // First four
          let colors = [graphColors.purpleRGBA(0.4), graphColors.purple]

          // Last four
          if (i > 3) {
            colors = [graphColors.greenRGBA(0.4), graphColors.green]
          }

          return (
            <PlayerBadge
              key={type.id}
              title={type.label}
              value={player[type.id]}
              rank={rank}
              colors={colors}
            />
          );
        })}
    </div>
  );
}

export default ProfileBadges;
