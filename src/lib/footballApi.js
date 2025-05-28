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

export const fetchTeams = (leagueId, season) =>
  fetchFromApi('/teams', { league: leagueId, season });

export const fetchPlayers = (teamId, season) =>
  fetchFromApi('/players', { team: teamId, season });

export const fetchFixtures = (filters = {}) =>
  fetchFromApi('/fixtures', filters);
