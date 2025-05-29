import { useEffect, useState } from "react";
import Table from "./Table.jsx";
import { useMatchPlayers } from "../hooks/useMatchPlayers.js";
import { fetchIdPlayers, fetchSeasonsPlayer, fetchStatistics } from "../lib/footballApi.js";

const fakeRow = {
  Team: {
    type: "img",
    src: "/images/Teams/Bayern Munich.png",
  },
  Games: 1,
  Wins: 1,
  Goals: 1,
  Assists: 1,
  Contributions: 1,
  Efficiency: 1,
  "Team ": 1,
  Individual: 1,
};

const fakeExpandable = {
  type: "videos",
  items: [
    {
      title: "Lionel Messi Career Highlights",
      channel: "The Highlight Factory",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/Ht1wQJTpNAA?si=EZgG-cl9qwZxhfgX" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    },
    {
      title: "Lionel Messi - 100 Magical Dribbling Skills",
      channel: "Fad3nHD",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/nA8wHQvHPJU?si=HUUL4FN4aZIYO2W-" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    },
  ],
};

const fakeRows = [];
const fakeExpandables = [];
for (let i = 0; i < 50; i++) {
  fakeRows.push({ ...fakeRow });
  fakeExpandables.push(fakeExpandable);
}

function YearTable({ player }) {

  const [playerStatistics, setPlayerStatistics] = useState([]);

  // hook para mapear a su coincidencia real en el array que arroja el idPlayer, versus la nacionalidad y el nombre del jugador que se extrae del useParams del profile consultado
  const { getMatchingPlayers } = useMatchPlayers();

// useEffect(() => {
//   const loadAllPlayerData = async () => {
//     try {
//       // Paso 1: Obtener ID del jugador
//       const nameParts = player.name.trim().split(" ");
//       const namePlayer =
//         nameParts.length > 1
//           ? nameParts[1].toLowerCase()
//           : nameParts[0].toLowerCase();

//       const idPlayersResponse = await fetchIdPlayers(namePlayer);
  
//       // Paso 2: Encontrar coincidencia con getMatchingPlayers
//       const matchingPlayers = getMatchingPlayers(player, idPlayersResponse);

//       if (matchingPlayers.length === 0) {
//         console.warn("No matching players found.");
//         return;
//       }

//       const playerId = matchingPlayers[0].player.id;

//       console.log(idPlayersResponse, playerId, matchingPlayers, 'datafetch')
//       // Paso 3: Obtener temporadas
//       const seasons = await fetchSeasonsPlayer(playerId);

//       console.log(seasons, 'seasons')

//       // Paso 4: Obtener estadísticas por cada temporada
//       const promises = seasons.map(( year ) =>
//         fetchStatistics(playerId, year)
//           .then((data) => ({year, data}))
//           .catch((error) => {
//             console.error(`Error fetching stats for ${year}:`, error);
//             return { year, data: null };
//           })
//       );

//       const statsBySeason = await Promise.all(promises);
//       const validStats = statsBySeason.filter((s) => s.data !== null);

//       console.log(statsBySeason, validStats, 'validStats')
//       setPlayerStatistics(statsBySeason);
//     } catch (err) {
//       console.error("Error loading player data:", err);
//     }
//   };

//   loadAllPlayerData();
// }, [player]);

// console.log(playerStatistics, 'playerStatistics')

  return (
    <Table
      headings={Object.keys(fakeRow).filter((h) => h !== "id")}
      items={fakeRows}
      expandables={fakeExpandables}
      _key={"id"}
      hide={["id"]}
      id="stats-teams-table"
      columnWidths={[
        "10%",
        "10%",
        "10%",
        "10%",
        "10%",
        "10%",
        "10%",
        "10%",
        "10%",
        "10%",
      ]}
      cellPaddingY="7.5px"
    />
  );
}

export default YearTable;
