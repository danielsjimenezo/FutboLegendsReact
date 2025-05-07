import PlayerBadge from "./PlayerBadge.jsx";
import { useSelector } from "react-redux";
import { selectPlayerState } from "../context/playerSlice.js";
import { futbolDataTypes } from "../utilities/futbolDataTypes.jsx";

function ProfileBadges({ player }) {
  const { shownBadges } = useSelector(selectPlayerState);


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
