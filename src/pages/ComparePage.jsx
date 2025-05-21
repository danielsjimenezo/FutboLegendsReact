import "./ComparePage.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPlayerState } from "../context/playerSlice.js";

import PlayerSearch from "../misc/PlayerSearch.jsx";
import ComparePicture from "../misc/ComparePicture.jsx";
import CompareStats from "../misc/CompareStats.jsx";

function ComparePage() {
  const { id1, id2 } = useParams();
  const { findPlayerById, players } = useSelector(selectPlayerState);

  const player1 =
    findPlayerById(id1) ||
    players.find((p) => p.name === "Lionel Messi");
  const player2 =
    findPlayerById(id2) ||
    players.find((p) => p.name === "Cristiano Ronaldo");

  const getCompareUrl = (player, i) => {
    // i is 0 or 1
    const newPlayerId = player?.name?.replaceAll(" ", "_") || "none";
    const player1Id = player1?.name?.replaceAll(" ", "_") || "none";
    const player2Id = player2?.name?.replaceAll(" ", "_") || "none";

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
        <div className="compare-search-container">
          <PlayerSearch
            alwaysOpen={true}
            url={(player) => getCompareUrl(player, 0)}
            searchIcon={true}
          />
        </div>
        <div className="compare-search-container">
          <PlayerSearch
            alwaysOpen={true}
            url={(player) => getCompareUrl(player, 1)}
            searchIcon={true}
          />
        </div>
      </div>
      <CompareStats player1={player1} player2={player2} />
    </section>
  );
}

export default ComparePage;
