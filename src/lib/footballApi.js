const BASE_URL = 'https://v3.football.api-sports.io';
const API_KEY = import.meta.env.VITE_API_FOOTBALL_KEY; // tu clave real en .env
const API_HOST = 'v3.football.api-sports.io';

const headers = new Headers();
headers.append('x-rapidapi-key', API_KEY);
headers.append('x-rapidapi-host', API_HOST);

/**
 * 🔹 Fetch data from API-Football
 * @param {string} endpoint - e.g. '/leagues'
 * @param {object} [params] - Optional query parameters
 */
const fetchFromApi = async (endpoint, params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const url = `${BASE_URL}${endpoint}${queryString ? `?${queryString}` : ''}`;

  const requestOptions = {
    method: 'GET',
    headers,
    redirect: 'follow',
  };

  const res = await fetch(url, requestOptions);
  if (!res.ok) throw new Error(`Error fetching ${endpoint}`);
  const data = await res.json();
  return data.response;
};

// 🔸 Specific helpers
export const fetchLeagues = () => fetchFromApi('/leagues');
export const fetchSeasons= () => fetchFromApi('/leagues/seasons');
// export const fetchIdPlayers = (name) => fetchFromApi(`/players?team=85&search=neymar&season=2021`);

// se puede optimizar con la base de datos en mongoDB
export const fetchIdPlayers = (name) => fetchFromApi(`/players/profiles?search=${name}`);
// pendiente hacer comparacion con el endpoint de ligas y temporadas para validar como traer la temporada textual ya que solo se calcula el año
// export const fetchSeasonsPlayer = (lastname) => fetchFromApi(`/players/seasons?player=messi`);
export const fetchSeasonsPlayer = (idPlayer) => fetchFromApi(`/players/seasons?player=${idPlayer}`);

export const fetchStatistics = (idPlayer, year) => fetchFromApi(`/players?id=${idPlayer}&season=${year}`);

// export const fetchPlayers = (firstnamePlayer) => fetchFromApi(`/players?search=${firstnamePlayer}&season=${2021}`);


export const fetchTeams = (leagueId, season) =>
  fetchFromApi('/teams', { league: leagueId, season });



// Free plans do not have access to this season, try from 2021 to 2023
//"team": "The League or Team field is required with the Search field.",
        // "league": "The League or Team field is required with the Search field."
// export const fetchPlayers = (firstnamePlayer, season, lastName) => {
// [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027]
//   return Promise.all([
//     fetch(`${baseUrl}/players?search=${firstnamePlayer}&season=${season}`, { headers }),
//     fetch(`${baseUrl}/players?league=61&search=${lastName}`, { headers }),
//     fetch(`/players${baseUrl}/players?team=${teamId}&search=${lastName}&season=${season}`, { headers })
//   ])
//     .then(responses => Promise.all(responses.map(res => res.json())))
//     .then(([byTeam, byLeague, byTeamAndSeason]) => {
//       return {
//         byTeam,
//         byLeague,
//         byTeamAndSeason
//       };
//     })
//     .catch(error => {
//       console.error("Error fetching players:", error);
//       throw error;
//     });
// };

export const fetchFixtures = (filters = {}) =>
  fetchFromApi('/fixtures', filters);
