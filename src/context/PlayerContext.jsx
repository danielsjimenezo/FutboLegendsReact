import { createContext, useContext, useState, useEffect } from "react";
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


  ///// DERIVED VALUES /////
  const [startIndex, endIndex] = [
    (playersPageNumber-1) * PER_PAGE,
    playersPageNumber * PER_PAGE
  ]
  const getFilteredPlayers = () => {
    const result = [...players]

    return result
  }
  const filteredPlayers = getFilteredPlayers()
  const getDisplayedPlayers = () => {
    return filteredPlayers.slice(startIndex, endIndex)
  }
  const displayedPlayers = getDisplayedPlayers()
  const filteredPageCount = Math.ceil(filteredPlayers.length/PER_PAGE)

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
    }
  }

  return (
    <PlayerContext.Provider
      value={{
        players,
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
