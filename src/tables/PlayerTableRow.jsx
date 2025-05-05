import { useNavigate } from "react-router-dom";
import FlagIcon from "../misc/FlagIcon.jsx";
import { usePlayerContext } from "../context/PlayerContext.jsx";
import { futbolDataTypes } from "../utilities/futbolDataTypes.jsx";

function PlayerTableRow({ player, rank }) {
  const navigate = useNavigate();

  const profilePicSrc = `/images/Players/${player.Player}.jpg`;
  const playerHref = `/profile/${player.Player.replaceAll(" ", "_")}`;
  const { shownColumns } = usePlayerContext();

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
      {futbolDataTypes
        .filter((type) => shownColumns.includes(type.id))
        .map((type) => {
          return <td key={type.id}>{type.getPlayerValue(player)}</td>;
        })}
    </tr>
  );
}

export default PlayerTableRow;

/*
  git add .
  git commit -m ""
  git push origin daniel
*/
