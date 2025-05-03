import { useNavigate } from "react-router-dom";
import FlagIcon from "../misc/FlagIcon.jsx";
import { usePlayerContext } from "../context/PlayerContext.jsx";

function PlayerTableRow({ player, rank }) {
  const navigate = useNavigate();

  const profilePicSrc = `/images/Players/${player.Player}.jpg`;
  const playerHref = `/profile/${player.Player.replaceAll(" ", "_")}`;
  const { shownColumns } = usePlayerContext()

  const handleTrClick = () => {
    navigate(playerHref);
  };

  return (
    <tr
      onClick={handleTrClick}
      onKeyUp={(e) => {
        if (e.key === "Enter") handleTrClick();
      }}
      tabIndex={0}
    >
      <td className="rank">{rank}.</td>
      <td>
        <div className="name-td">
          <img
            src={profilePicSrc}
            alt={`Photo of ${player.Player}`}
            className={`picture ${
              player.Active === "TRUE" ? "active" : "inactive"
            }`}
            loading="lazy"
          />
          <p>{player.Player}</p>
        </div>
      </td>
      <td>{player.Position}</td>
      <td>
        <FlagIcon countryName={player.birthCountry} />
      </td>
      {shownColumns.includes('games') && <td>{player.GamesPlayed || "N/A"}</td>}
      {shownColumns.includes('goals') && <td>{player.Goals || "N/A"}</td>}
      {shownColumns.includes('assists') && <td>{player.Assists || "N/A"}</td>}
      {shownColumns.includes('contributions') && <td>{player.GoalContributions || "N/A"}</td>}
      {shownColumns.includes('efficiency') && <td>{player.Efficiency || "N/A"}</td>}
      {shownColumns.includes('balon1') && <td>{player["Balon (1st)"] || 0}</td>}
      {shownColumns.includes('balon2') && <td>{player["Balon (2nd)"] || 0}</td>}
      {shownColumns.includes('balon3') && <td>{player["Balon (3rd)"] || 0}</td>}
    </tr>
  );
}

export default PlayerTableRow;

/*
  git add .
  git commit -m ""
  git push origin daniel
*/
