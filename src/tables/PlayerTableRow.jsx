import { useNavigate } from "react-router-dom";
import FlagIcon from "../misc/FlagIcon.jsx";
import { futbolDataTypes } from "../utilities/futbolDataTypes.js";
import { useSelector } from "react-redux";
import { selectPlayerState } from "../context/playerSlice.js";
import Tooltip from "../misc/Tooltip.jsx";

function PlayerTableRow({ player, rank }) {
  const navigate = useNavigate();

  const profilePicSrc = `/images/Players/${player.name}.jpg`;
  const playerHref = `/profile/${player.name.replaceAll(" ", "_")}`;
  const { shownColumns } = useSelector(selectPlayerState);

  const handleTrClick = () => {
    navigate(playerHref);
  };

  return (
    <tr
      className="trPillHover"
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
            alt={`Photo of ${player.name}`}
            className={`picture ${
              player.active ? "active" : "inactive"
            }`}
            loading="lazy"
          />
          <p>{player.name}</p>
        </div>
      </td>
      <td>{player.Position}</td>
      <td className="country">
        <Tooltip message={player.birthCountry}>
          <FlagIcon countryName={player.birthCountry} />
        </Tooltip>
      </td>
      {futbolDataTypes
        .filter((type) => shownColumns.includes(type.id))
        .map((type) => {
          return <td className="number" key={type.id}>{player[type.id].toLocaleString()}</td>;
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
