/*
    git add .
    git commit -m "fixed header"
    git push origin main
*/

function PlayerTableRow({ player, rank }) {
    const profilePicSrc = `/images/Players/${player.Player}.jpg`;
    const flagSrc = `/images/Flags/${player.birthCountry}.png`;
    const playerHref = ``

  return (
    <tr>
      <td>
        ${rank}.
      </td>
      <td>
        <div class="name-td">
          <img 
            src="${profilePicSrc}" 
            alt="Photo of ${player.Player}" 
            class={`${player.Active === "TRUE" ? "active" : "inactive"}`} 
            loading="lazy">
          <a href="/profile.html?name=${player.Player.replaceAll(" ", "_")}">
            ${player.Player}
          </a>
        </div>
      </td>
      <td>
        ${player.Position}
      </td>
      <td>
          <img src="${flagSrc}" alt="Photo of ${player.birthCountry}" class="flag" loading="lazy">
      </td>
      <td>
        ${player.GamesPlayed}
      </td>
      <td>
        ${player.Goals}
      </td>
      <td>
        ${player.Assists}
      </td>
      <td>
        ${player.GoalContributions}
      </td>
      <td>
        ${player.Efficiency}
      </td>
    </tr>
  )
}

export default PlayerTableRow;
