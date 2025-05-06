import {getPlayerData} from "../utilities/utilities";
import React, { use, useEffect, useState } from "react";

function TablePlayerMatches({ playerId }) {

    const [matches, setMatches] = useState([]);

    useEffect(() => {
       const getMatches = async () => {
            try {
                const data = await getPlayerData();
                if (!data) {
                    console.error("No data found for player matches.");
                    return;
                }
                setMatches(data);
            } catch (error) {
                console.error("Error fetching player matches:", error);
            }
        }
        getMatches();
    }, []);

  return (
    <section className="table-container">
        <table className="table-player-matches">
            <thead className="table-dark">
                <tr>
                <th scope="col">Team</th>
                <th scope="col">Date</th>
                <th scope="col">Opp.</th>
                <th scope="col">Result</th>
                <th scope="col">Goals</th>
                <th scope="col">Assists</th>
                <th scope="col">G+A</th>
                <th scope="col">minutes</th>
                </tr>
            </thead>
            <tbody>
                {matches.map((match, index) => (
                    <React.Fragment key={index}>
                        <tr key={index}>
                        <td>
                            <img src={`/images/Teams/${match.Team}.png`} alt={`Logo of ${match.team}`} className="team-logo" />
                        </td>
                        <td>{match.Date}</td>
                        <td>
                            <img src={`/images/Teams/${match.opponent}.png`} alt={`Logo of ${match.team}`} className="team-logo" /> 
                        </td>
                        <td>{match.score}</td>
                        <td>{match.goals}</td>
                        <td>{match.assists}</td>
                        <td>{match.goals + match.assists}</td>
                        <td>{match.minutes_played}</td>
                    </tr>
                    <tr className="details-row">
                    <td colspan="5">
                        <div className="videos">
                        <h3>{match.team} vs {match.opponent}</h3>
                        <h3 id="videoItem">Video del Equipo</h3>
                        </div>
                        <div className="video-row" >
                        <div className="video-container-team" >Cargando video...</div>
                        </div>
                    </td>
                    <td colspan="5">
                        <div className="videos">
                        <h3>{match.player} vs {match.opponent}</h3>
                        <h3 id="videoPlayer">Video del Jugador</h3>
                        </div>
                        <div className="video-row" >
                        <div className="video-container-player" >Cargando video...</div>
                        </div>
                    </td>
                </tr>

                    </React.Fragment>
                ))}
            </tbody>
        </table>
    </section>
  );
}


async function toggleDetails(row, team, opponent, playerName) {
    const nextRow = row.nextElementSibling;
  
  
    if (nextRow.style.display === "none") {
      nextRow.style.display = "table-row";
      toggleDetailsVideo(nextRow,".video-container-team", team, opponent);
      toggleDetailsVideo(nextRow,".video-container-player", playerName, opponent);
     
    } else {
      nextRow.style.display = "none";
      //videoContainer.innerHTML = "";
    }
  }
  
  
  async function toggleDetailsVideo(nextRow,video_container, team, opponent) {
    const videoContainer = nextRow.querySelector(video_container);
    const query = `${team} vs ${opponent} highlights`;
    const result = await buscarVideoYouTube(query);
    const videoId = result?.videoId || null;
    const channelName = result?.channelName || null;
  
  
    if (videoId) {
      videoContainer.innerHTML = `
        <iframe width="100%" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
      `;
      if (video_container === ".video-container-player") {
        document.getElementById("videoPlayer").textContent = channelName;
      }else{
        document.getElementById("videoItem").textContent = channelName;
      }
    } else {
      videoContainer.textContent = "No se encontró video.";
    }
  }
  

export default TablePlayerMatches;