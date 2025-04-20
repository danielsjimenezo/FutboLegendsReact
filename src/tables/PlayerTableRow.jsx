import { useNavigate } from "react-router-dom";

function PlayerTableRow({ player, rank }) {
  const navigate = useNavigate()

    const profilePicSrc = `/images/Players/${player.Player}.jpg`;
    const flagSrc = `/images/Flags/${player.birthCountry}.png`;
    const playerHref = `/profile/${player.Player.replaceAll(' ','_')}`

  const handleTrClick = () => {
    navigate(playerHref)
  }

  return (
    <tr onClick={handleTrClick} onKeyUp={e => {
      if (e.key === 'Enter') handleTrClick()
    }} tabIndex={0}>
      <td>
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
          {player.Player}
        </div>
      </td>
      <td>
        {player.Position}
      </td>
      <td>
          <img src={flagSrc} alt={`Flag of ${player.birthCountry}`} className="flag" loading="lazy" />
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
