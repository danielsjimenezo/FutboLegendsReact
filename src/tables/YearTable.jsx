import { useEffect, useState } from "react";
import Table from "./Table.jsx";

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

// const fakeRowNew = {
//   Team: {
//     type: "img",
//     src: playerStatistics[0].statistics.map((season)=>season.team.logo),
//   },
//   Games: 1,
//   Wins: 1,
//   Goals: 1,
//   Assists: 1,
//   Contributions: 1,
//   Efficiency: 1,
//   "Team ": 1,
//   Individual: 1,
// };

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

// const fakeRows = [];
// const fakeExpandables = [];
// for (let i = 0; i < 50; i++) {
//   fakeRows.push({ ...fakeRow });
//   fakeExpandables.push(fakeExpandable);
// }

function YearTable({ player, playerStatistics }) {
  const [rows, setRows] = useState([]);
  const [expandables, setExpandables] = useState([]);

  //fundión que que genera dinámicamente las búsquedas para videos de YouTube basadas en los equipos y años en los que jugó un jugador
  const generateExpandableQueries = (playerName, playerStatistics) => {
    //playerName: el nombre del jugador (por ejemplo, "Lionel Messi").
    //playerStatistics: un arreglo de datos por año, donde cada año contiene estadísticas del jugador en distintas competiciones y equipos.

    if (!Array.isArray(playerStatistics)) return [];

    const teamHistory = {};
    //Recorremos cada año de la carrera del jugador:
    playerStatistics.forEach((seasonData) => {
      const year = seasonData.year;
      seasonData.data.forEach((playerData) => {
        //Por cada torneo jugado ese año:
        playerData.statistics.forEach((stat) => {
          const teamName = stat.team?.name;
          if (!teamName) return;
            //Construimos el historial del equipo
          if (!teamHistory[teamName]) {
            teamHistory[teamName] = [];
          }

          teamHistory[teamName].push(year);
        });
      });
    });

    const expandables = [];
    //Creamos los objetos expandable por equipo
    Object.entries(teamHistory).forEach(([teamName, years]) => {
        // Ordenamos y limpiamos los años
      const sortedYears = [...new Set(years)].sort((a, b) => a - b);
      //Calculamos los extremos del período
      const year1 = sortedYears[0];
      const year2 = sortedYears[sortedYears.length - 1];
      //Creamos la consulta (query) para YouTube  
      expandables.push({
        type: "YTAPI",
        query: `${playerName} all goals and assists ${year1}-${year2} ${teamName}`,
        year1: `${year1}`,
        team: teamName,
      });
    });

    return expandables;
  };

  useEffect(() => {
    //Evita errores si playerStatistics no es un arreglo válido.
    if (!Array.isArray(playerStatistics)) return;

    // agrupar estadísticas por año y por equipo usando una clave combinada
    const groupedStats = {}; // clave: `${year}-${teamId}`

    //Recorre cada año (2004, 2005, 2009, etc.)
    playerStatistics.forEach((seasonData) => {
      const year = seasonData.year;

      //Acceder a los datos de cada jugador en ese año
      seasonData.data.forEach((playerData) => {
        //Recorrer las estadísticas de ese jugador
        playerData.statistics.forEach((stat) => {
          const teamId = stat.team?.id;
          const key = `${year}-${teamId}`;

          // Inicializar si no existe el grupo para ese año/equipo
          if (!groupedStats[key]) {
            groupedStats[key] = {
              year,
              teamName: stat.team?.name || "",
              teamLogo: stat.team?.logo || "",
              games: 0,
              wins: 0,
              goals: 0,
              assists: 0,
              duels: 0,
              duelsWon: 0,
            };
          }
          //Acumulamos los valores - Vamos sumando los valores por año/equipo.
          groupedStats[key].games += stat.games?.appearences || 0;
          groupedStats[key].wins += stat.duels?.won || 0;
          groupedStats[key].goals += stat.goals?.total || 0;
          groupedStats[key].assists += stat.goals?.assists || 0;
          groupedStats[key].duels += stat.duels?.total || 0;
          groupedStats[key].duelsWon += stat.duels?.won || 0;
        });
      });
    });

    const rows = [];
    const expandables = [];
    // Convertimos los grupos a filas de tabla
    Object.values(groupedStats).forEach((data) => {
      const contributions = data.goals + data.assists;
      const efficiency = data.games > 0 ? contributions / data.games : 0;
      // Creamos las filas para la tabla
      rows.push({
        Year: data.year,
        Team: {
          type: "img",
          src: data.teamLogo,
        },
        Games: data.games,
        Wins: data.wins,
        Goals: data.goals,
        Assists: data.assists,
        Contributions: contributions,
        Efficiency: efficiency.toFixed(2),
        "Team ": data.teamName, // pendiente definir la api para extraer estos datos de trofeos por grupo
        Individual: data.duels, // pendiente definir la api para extraer estos datos de trofeos por grupo
      });
      //Creamos los expandables
      expandables.push(fakeExpandable);
    });

    const expandablesFromStats = generateExpandableQueries(
      player.name,
      playerStatistics
    );

    console.log(expandablesFromStats, 'expandablesFromStats')
    // Guardamos todo en el estado
    setRows(rows);
    setExpandables(() => expandablesFromStats);
  }, [player, playerStatistics]);

  console.log("playerStatistics:", rows, expandables);

  return (
    <Table
      headings={["Year", ...Object.keys(fakeRow).filter((h) => h !== "id")]}
      items={rows}
      expandables={expandables}
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
