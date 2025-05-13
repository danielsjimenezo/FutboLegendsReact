import PlayerBadge from "./PlayerBadge.jsx";
import { useSelector } from "react-redux";
import { selectPlayerState } from "../context/playerSlice.js";
import { futbolDataTypes } from "../utilities/futbolDataTypes.jsx";

function ProfileBadges({ player }) {
  const { shownBadges, leaderboardCountry } = useSelector(selectPlayerState);
  console.log("leaderboardCountry", leaderboardCountry)

  return (
    <div className="profileStats">
      {/* <h3 id="leaderboard-heading">
                Leaderboard
                <ShownBadgesFilter />
            </h3> */}
      {futbolDataTypes
        .filter((type) => shownBadges.includes(type.id))
        .map((type) => {
          const rank = leaderboardCountry === 'all' ? type.getPlayerRank(player) : type.getPlayerRankNative(player)

          return (
            <PlayerBadge
              key={type.id}
              title={type.label}
              value={type.getPlayerValue(player)}
              rank={rank}
            />
          );
        })}
    </div>
  );
}

export default ProfileBadges;
