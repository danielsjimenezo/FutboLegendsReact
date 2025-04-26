import { useNavigate } from "react-router-dom";
import FlagIcon from "../misc/FlagIcon.jsx";

function PlayerTableRow({ player, rank }) {
  const navigate = useNavigate()

    const profilePicSrc = `/images/Players/${player.Player}.jpg`;
    const playerHref = `/profile/${player.Player.replaceAll(' ','_')}`

  const handleTrClick = () => {
    navigate(playerHref)
  }

  return (
    <tr onClick={handleTrClick} onKeyUp={e => {
      if (e.key === 'Enter') handleTrClick()
    }} tabIndex={0}>
      <td className="rank">
        {rank}.
      </td>
      <td>
        <div className="name-td">
          <img 
            src={profilePicSrc}
            alt={`Photo of ${player.Player}`} 
            className={`picture ${player.Active === "TRUE" ? "active" : "inactive"}`} 
            loading="lazy"
          />
          <p>{player.Player}</p>
        </div>
      </td>
      <td>
        {player.Position}
      </td>
      <td>
          <FlagIcon countryName={player.birthCountry} />
      </td>
      <td>
        {player.GamesPlayed}
      </td>
      <td>
        {player.Goals}
      </td>
      <td>
        {player.Assists}
      </td>
      <td>
        {player.GoalContributions}
      </td>
      <td>
        {player.Efficiency}
      </td>
    </tr>
  )
}

export default PlayerTableRow;
