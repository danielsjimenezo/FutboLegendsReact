import { useEffect, useState } from "react";
import Table from "./Table.jsx";
import { fetchIdPlayers, fetchStatistics } from "../lib/footballApi.js";
import { useMatchPlayers } from "../hooks/useMatchPlayers.js";

const fakeRow = {
  Season: "2020/2021",
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

// const fakeExpandable = {
//   type: "videos",
//   items: [
//     {
//       title: "Lionel Messi Career Highlights",
//       channel: "The Highlight Factory",
//       embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/Ht1wQJTpNAA?si=EZgG-cl9qwZxhfgX" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
//     },
//     {
//       title: "Lionel Messi - 100 Magical Dribbling Skills",
//       channel: "Fad3nHD",
//       embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/nA8wHQvHPJU?si=HUUL4FN4aZIYO2W-" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
//     },
//   ],
// };

function SeasonTable({ player }) {
  // Declaramos el estado local 'leagues', que es un arreglo donde almacenaremos los datos de las ligas.
  const [idPlayer, setIdPlayer] = useState([]);
  const [playerStatistics, setPlayerStatistics] = useState([]);

// hook para mapear a su coincidencia real en el array que arroja el idPlayer, versus la nacionalidad y el nombre del jugador que se extrae del useParams del profile consultado
  const { getMatchingPlayers } = useMatchPlayers();

  const fakeRows = [];
  const fakeExpandables = [];
  const startYear = new Date().getFullYear();
  for (let i = 0; i < 30; i++) {
    fakeRows.push({
      ...fakeRow,
      Season: `${startYear - i - 1}/${startYear - i}`,
    });
    const year1 = startYear - i - 1;
    const year2 = startYear - i;
    fakeExpandables.push({
      type: "YTAPI",
      query: `${player.name} all goals and assists ${year1}-${year2} season`,
    });
  }

  console.log(player, "player.name");

  // endpoint con un jugador {nombre}
  // get ( "https://v3.football.api-sports.io/players?team=85&search=cavani" ) ;
  // get ( "https://v3.football.api-sports.io/players?league=61&search=cavani" ) ;
  // get ( "https://v3.football.api-sports.io/players?team=85&search=cavani&season=2018" ) ;
  // logica con use params
  // la respuesta se pasa como items

  useEffect(() => {
    // Función asincrónica interna que llama a la API
    const loadIdPlayer = async () => {
      const nameParts = player.name.trim().split(" ");
const namePlayer = nameParts.length > 1
  ? nameParts[1].toLowerCase()
  : nameParts[0].toLowerCase(); // fallback al nombre único si no hay apellido

      const data = await fetchIdPlayers(namePlayer); // Esperamos la respuesta de la API de ligas.
      console.log(data, 'data')

      setIdPlayer(data); // Guardamos los datos en el estado
      // setIdPlayer(data);
    };

    loadIdPlayer(); // Ejecutamos la función para cargar los datos
  }, [player]);

  useEffect(() => {
  const loadStatistics = async () => {
    const matchingPlayers = getMatchingPlayers(player, idPlayer);

    console.log(matchingPlayers, "matchingPlayers");

    if (matchingPlayers.length > 0) {
      const data = await fetchStatistics(matchingPlayers[0].player.id);
      setPlayerStatistics(data);
    } else {
      console.warn("No matching players found.");
    }
  };

  if (idPlayer.length > 0) loadStatistics();
}, [idPlayer, player]);

  console.log(idPlayer, playerStatistics, "players");

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

export default SeasonTable;
