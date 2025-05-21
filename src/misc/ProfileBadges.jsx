import PlayerBadge from "./PlayerBadge.jsx";
import { useSelector } from "react-redux";
import { selectPlayerState } from "../context/playerSlice.js";
import { futbolDataTypes } from "../utilities/futbolDataTypes.js";

function ProfileBadges({ player }) {
  const { shownBadges, leaderboardCountry } = useSelector(selectPlayerState);
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
          const rank = leaderboardCountry === 'all' ? player.rankings.world[type.id] : player.rankings.country[type.id]

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
