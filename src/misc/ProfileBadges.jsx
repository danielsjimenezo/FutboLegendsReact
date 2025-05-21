import PlayerBadge from "./PlayerBadge.jsx";
import { useSelector } from "react-redux";
import { selectPlayerState } from "../context/playerSlice.js";
import { futbolDataTypes } from "../utilities/futbolDataTypes.js";

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
        .map((type) => {
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

          return (
            <PlayerBadge
              key={type.id}
              title={type.label}
              value={player[type.id]}
              rank={rank}
            />
          );
        })}
    </div>
  );
}

export default ProfileBadges;
