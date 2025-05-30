import { useEffect, useState } from "react";
import PlayerMatchTable from "../../tables/PlayerMatchTable.jsx";
import PlayerGoalTable from "../../tables/PlayerGoalTable.jsx";
import StatsPlayoffsTable from "../../tables/StatsPlayoffsTable.jsx";
import StatsTeamsTable from "../../tables/StatsTeamsTable.jsx";
import SeasonTable from "../../tables/SeasonTable.jsx";
import YearTable from "../../tables/YearTable.jsx";
import Toggle from "../../misc/Toggle.jsx";
import { useMatchPlayers } from "../../hooks/useMatchPlayers.js";
// import Table from "./Table.jsx";
// import {
//   fetchIdPlayers,
//   fetchIdProfiles,
//   fetchSeasonsPlayer,
//   fetchStatistics,
// } from "../../lib/footballApi.js";
import { fetchDataApiFootball } from "../../utilities/utilities.js";

function ProfilePageTables({ player }) {
  const [matchTableShown, setMatchTableShown] = useState("match");
  const [statsTableShown, setStatsTableShown] = useState("playoffs");
  const [timeTableShown, setTimeTableShown] = useState("season");
  // Declaramos el estado local
  const [playerStatistics, setPlayerStatistics] = useState([]);

  // hook para mapear a su coincidencia real en el array que arroja el idPlayer, versus la nacionalidad y el nombre del jugador que se extrae del useParams del profile consultado
  const { getMatchingPlayers } = useMatchPlayers();

  // hacer un composition pattern para evitar el prop drilling

  //    useEffect(() => {
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

  //       // console.log(statsBySeason, validStats, 'validStats')
  //       setPlayerStatistics(validStats);
  //     } catch (err) {
  //       console.error("Error loading player data:", err);
  //     }
  //   };

  //   loadAllPlayerData();
  // }, [player]);

  // console.log(playerStatistics?[0].statistics, 'playerStatistics')

  //fetch de pruebas para consumo de las propiedades de estadisticas del jugador según la respuesta en la  API

  useEffect(() => {
    const loadAllPlayerData = async () => {
      try {
        const playersResponse = await fetchDataApiFootball();
        setPlayerStatistics(playersResponse);
      } catch (err) {
        console.error("Error loading player data:", err);
      }
    };

    loadAllPlayerData();
  }, [player]);

  return (
    <section className="container">
      {/* TIME TABLES */}
      <Toggle
        option1={{ label: "By season", value: "season" }}
        option2={{ label: "By year", value: "year" }}
        onClick={(e, option) => setTimeTableShown(option.value)}
        style={{ marginBottom: "1rem" }}
      />
      {timeTableShown === "season" ? (
        <SeasonTable player={player} playerStatistics={playerStatistics} />
      ) : (
        <YearTable player={player} playerStatistics={playerStatistics} />
      )}

      {/* MATCH/GOALS */}
      <Toggle
        option1={{ label: "Matches", value: "match" }}
        option2={{ label: "Goals", value: "goal" }}
        onClick={(e, option) => setMatchTableShown(option.value)}
        style={{ marginBottom: "1rem" }}
      />
      {matchTableShown === "match" ? <PlayerMatchTable /> : <PlayerGoalTable />}

      {/* PLAYOFFS/TEAMS */}
      <Toggle
        option1={{ label: "Stats in playoffs", value: "playoffs" }}
        option2={{ label: "Stats against top teams", value: "teams" }}
        onClick={(e, option) => setStatsTableShown(option.value)}
        style={{ marginBottom: "1rem" }}
      />
      {statsTableShown === "playoffs" ? (
        <StatsPlayoffsTable />
      ) : (
        <StatsTeamsTable />
      )}
    </section>
  );
}

export default ProfilePageTables;
