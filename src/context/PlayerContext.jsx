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
  const [countryFilter, setCountryFilter] = useState('all')
  const [positionFilter, setPositionFilter] = useState('all')


  ///// DERIVED VALUES /////
  const [startIndex, endIndex] = [
    (playersPageNumber-1) * PER_PAGE,
    playersPageNumber * PER_PAGE
  ]

  const getFilteredPlayers = () => {
    let result = [...players]

    if (countryFilter !== 'all') {
      result = result.filter(p => p.birthCountry === countryFilter)
    }

    if (positionFilter !== 'all') {
      result = result.filter(p => p.Position === positionFilter)
    }

    return result
  }

  const filteredPlayers = getFilteredPlayers()

  const getDisplayedPlayers = () => {
    return filteredPlayers.slice(startIndex, endIndex)
  }

  const displayedPlayers = getDisplayedPlayers()

  const filteredPageCount = Math.ceil(filteredPlayers.length/PER_PAGE)

  // filter options
  const countries = useMemo(() => {
      return ([...new Set(players.map(p => p.birthCountry))]).toSorted().filter(c => c)
  }, [players])
  const positions = useMemo(() => {
      return ([...new Set(players.map(p => p.Position))]).toSorted().filter(c => c)
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
        actions
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
