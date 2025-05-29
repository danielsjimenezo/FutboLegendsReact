import axios from "axios";

const BASE_URL = "http://localhost:3001/api/";

const apiClient = axios.create({
  baseURL: BASE_URL
});

const leaguesPriorityList = [{name: "La Liga", country: "Spain"},
  {name: "Bundesliga", country: "Germany"},
  {name: "Serie A", country: "Italy"},
  {name: "Ligue 1", country: "France"},
  {name: "Eredivisie", country: "Netherlands"},
  {name: "Primeira Liga", country: "Portugal"},
  {name: "Premier League", country: "England"},
  {name: "Major League Soccer", country: "USA"},
  {name: "Liga MX", country: "Mexico"},
  {name: "Champions League", country: "World"},
  {name: "UEFA Europa League", country: "World"},
  {name: "World Cup", country: "World"},
  {name: "Copa America", country: "World"},
  {name: "Euro Championship", country: "World"},
  {name: "Liga Profesional Argentina", country: "Argentina"},
  {name: "Primera A", country: "Colombia"},
  {name: "CONMEBOL Libertadores", country: "World"},
];




export const getTodayFixtures = async (date) => {
  const dateMatch = date.toISOString().split("T")[0];
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  try {
    const response = await apiClient.get("fixtures", {
      params: {
        date: dateMatch,
        timezone: userTimezone
      },
    });
    const matches = response.data.response;
    const matchesWithLeague = matches.filter(match => 
      leaguesPriorityList.some(league => league.name === match.league.name && league.country === match.league.country)
    );
    return matchesWithLeague;
  } catch (error) {
    console.error("Error fetching today's fixtures:", error);
    throw error;
  }
};

export const getTodayFixturesPerLeague = async (date, leagueId) => {
  const dateMatch = date.split("T")[0];
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  try {
    const response = await apiClient.get("fixtures", {
      params: {
        date: dateMatch,
        timezone: userTimezone,
        league: leagueId
      },
    });
    return response.data.response;  
  } catch (error) {
    console.error("Error fetching today's fixtures:", error);
    throw error;
  }
};


export const fetchGoalscorers = async (fixtureId) => {
    try {
        const response = await apiClient.get("goals", {
          params: { fixture: fixtureId }
        });
  
      const events = response.data.response;
  
      const goals = events.filter(event => event.type === "Goal");

      return goals;
  
  
    } catch (error) {
      console.error("Error al obtener eventos:", error);
    }
  };


export const getLeagues = async () => {
    try {
        const response = await apiClient.get("leagues", {
          params: {
            current: true
          }
        });

        const leagues = response.data.response;

        console.log(leagues);

        const leaguesWithId = leagues.map(league => ({
          
          id: league.league.id,
          name: league.league.name,
          country: league.country.name,
          logo: league.league.logo,
        }));

        const leaguesUnique = leaguesWithId.filter((league, index, self) =>
          index === self.findIndex((t) => t.name === league.name)
        );


        const leaguesWithPriority = leaguesUnique.filter(league =>
          leaguesPriorityList.some(priorityLeague => priorityLeague.name === league.name && priorityLeague.country === league.country)
        );

        return leaguesWithPriority;


    } catch (error) {
        console.error("Error fetching leagues:", error);
        throw error;
    }
};

export const getTopScorersPerLeague = async (leagueId, season) => {
  try {
    const response = await apiClient.get("topscorers", {
      params: {
        league: leagueId,
        season: season
      }
    });
    return response.data.response.slice(0, 10);
  } catch (error) {
    console.error("Error fetching top scorers:", error);
    throw error;
  }
};

export const getTopAssistsPerLeague = async (leagueId, season) => {
  try {
    const response = await apiClient.get("topassists", {
      params: {
        league: leagueId,
        season: season
      }
    });
    console.log("response.data.response");
    console.log(response.data.response);
    return response.data.response.slice(0, 10);
  } catch (error) {
    console.error("Error fetching top assists:", error);
    throw error;
  }
};

export const getTopScorers = async (leaguesIds, season) => {
  const promises = leaguesIds.map(leagueId => getTopScorersPerLeague(leagueId, season));
  const topScorersPerLeague = await Promise.all(promises);

  const topScorers = topScorersPerLeague.flat();

  topScorers.sort((a, b) => {
    const goalsA = a.statistics[0]?.goals?.total || 0;
    const goalsB = b.statistics[0]?.goals?.total || 0;
    return goalsB - goalsA;
  });


  return topScorers.slice(0, 10);
};

export const getTopAssists = async (leaguesIds, season) => {
  const promises = leaguesIds.map(leagueId => getTopAssistsPerLeague(leagueId, season));
  const topAssistsPerLeague = await Promise.all(promises);

  const topAssists = topAssistsPerLeague.flat();

  topAssists.sort((a, b) => {
    const assistsA = a.statistics[0]?.goals.assists || 0;
    const assistsB = b.statistics[0]?.goals.assists || 0;
    return assistsB - assistsA;
  });

  return topAssists.slice(0, 10);
};