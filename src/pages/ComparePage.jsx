import "./ComparePage.css";
import { useParams } from "react-router-dom";
import { usePlayerContext } from "../context/PlayerContext.jsx";
import PlayerSearch from "../misc/PlayerSearch.jsx";
import ComparePicture from "../misc/ComparePicture.jsx";
import CompareStats from "../misc/CompareStats.jsx";

function ComparePage() {
  const { id1, id2 } = useParams();
  const { actions, players } = usePlayerContext();

  const player1 =
    actions.findPlayerById(id1) ||
    players.find((p) => p.Player === "Lionel Messi");
  const player2 =
    actions.findPlayerById(id2) ||
    players.find((p) => p.Player === "Cristiano Ronaldo");

  const getCompareUrl = (player, i) => {
    // i is 0 or 1
    const newPlayerId = player?.Player?.replaceAll(" ", "_") || "none";
    const player1Id = player1?.Player?.replaceAll(" ", "_") || "none";
    const player2Id = player2?.Player?.replaceAll(" ", "_") || "none";

    switch (i) {
      case 0:
        return `/compare/${newPlayerId}/${player2Id}`;
      case 1:
        return `/compare/${player1Id}/${newPlayerId}`;
    }
  };

  return (
    <section className="content-container-compare">
      <div id="compare-picture-section">
        <ComparePicture player={player1} />
        <ComparePicture player={player2} />
        <PlayerSearch
          alwaysOpen={true}
          url={(player) => getCompareUrl(player, 0)}
          searchIcon={true}
        />
        <PlayerSearch
          alwaysOpen={true}
          url={(player) => getCompareUrl(player, 1)}
          searchIcon={true}
        />
      </div>
      <CompareStats player1={player1} player2={player2} />
    </section>
  );
}

export default ComparePage;
