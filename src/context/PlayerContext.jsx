import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { fetchData } from "../utilities/utilities.js";

const PER_PAGE = 15;

const PlayerContext = createContext();

export const usePlayerContext = () => {
  return useContext(PlayerContext);
};

export const PlayerContextProvider = ({ children }) => {
  ///// STATE /////
  const [players, setPlayers] = useState([]);
  const [playersLoadingState, setPlayersLoadingState] = useState("loading");
  const [playersPageNumber, setPlayersPageNumber] = useState(1)
  const [playerSort, setPlayerSort] = useState('contributions')
  const [countryFilter, setCountryFilter] = useState('all')
  const [positionFilter, setPositionFilter] = useState('all')


  ///// DERIVED VALUES /////
  const [startIndex, endIndex] = [
    (playersPageNumber-1) * PER_PAGE,
    playersPageNumber * PER_PAGE
  ]

  const getFilteredPlayers = () => {
    let result = [...players]

    /// HANDLE FILTERS
    if (countryFilter !== 'all') {
      result = result.filter(p => p.birthCountry === countryFilter)
    }

    if (positionFilter !== 'all') {
      result = result.filter(p => p.Position === positionFilter)
    }

    /// HANDLE SORT
    result.sort((a, b) => {
      switch(playerSort) {
        case 'contributions':
          return (b.Goals + b.Assists) - (a.Goals + a.Assists)
        case 'goals':
        case 'assists':
        case 'efficiency':
          const key = playerSort[0].toUpperCase() + playerSort.slice(1)
          return b[key] - a[key]
      }
    })

    return result
  }

  const filteredPlayers = getFilteredPlayers()

  const getDisplayedPlayers = () => {
    return filteredPlayers.slice(startIndex, endIndex)
  }

  const displayedPlayers = getDisplayedPlayers()
  console.log("displayed players:", displayedPlayers)

  const filteredPageCount = Math.ceil(filteredPlayers.length/PER_PAGE)

  // filter options
  const countries = useMemo(() => {
      return ([...new Set(players.map(p => p.birthCountry))]).toSorted().filter(c => c)
  }, [players])
  const positions = useMemo(() => {
      return ([...new Set(players.map(p => p.Position))]).toSorted().filter(c => c)
  }, [players])

  const maxValues = useMemo(() => {
    return getMaxValues(players)
  }, [players])

  ///// FETCHING DATA /////
  const loadPlayerData = async () => {
    const data = await fetchData();

    if (!data) {
      setPlayersLoadingState("error");
      return;
    }

    setPlayers(data)
    setPlayersLoadingState("success");
  };
  
  // This useEffect means the function will only  be called once
  useEffect(() => {
    loadPlayerData();
  }, []);

  ///// CONTEXT ACTIONS /////
  const actions = {
    turnPage(delta) { // delta is 1 for forward and -1 for back
      const newPageNumber = playersPageNumber + delta;
      if (newPageNumber < 1) return;
      if (newPageNumber > filteredPageCount) return;
      setPlayersPageNumber(newPageNumber)
    },
    changeFilter(key, value) { // key is "countries" or "positions"
      setPlayersPageNumber(1)
      switch (key) {
        case 'countries':
          setCountryFilter(value)
          break
        case 'positions':
          setPositionFilter(value)
          break
      }
    },
    findPlayerById(id) {
      if (!id) return
      return players.find(p => id.toString().replaceAll('_',' ') === p.Player)
    }
  }

  return (
    <PlayerContext.Provider
      value={{
        players,
        countries,
        positions,
        playersLoadingState,
        displayedPlayers,
        playersPageNumber,
        PER_PAGE,
        filteredPageCount,
        actions,
        maxValues,
        playerSort,
        setPlayerSort
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

//////////// Utility

function getMaxValues(allPlayers) {
    const maxValues = {}

    const allGamesPlayed = allPlayers.map((p) => toNumber(p.GamesPlayed))
    maxValues.GamesPlayed = Math.max(...allGamesPlayed)

    const allGoals = allPlayers.map((p) => toNumber(p.Goals))
    maxValues.Goals = Math.max(...allGoals)

    const allAssists = allPlayers.map((p) => toNumber(p.Assists))
    maxValues.Assists = Math.max(...allAssists)

    const allContributions = allPlayers.map((p) => toNumber(p.GoalContributions))
    maxValues.GoalContributions = Math.max(...allContributions)

    const allEfficiencies = allPlayers.map((p) => toNumber(p.Efficiency))
    maxValues.Efficiency = Math.max(...allEfficiencies)

    return maxValues
}

function toNumber(val) {
  if (typeof val === "number") return val;
  return Number(val.replaceAll(",", "")) || 0;
}