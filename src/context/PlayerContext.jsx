import { createContext, useContext, useState, useEffect } from "react";
import { fetchData } from "../utilities/utilities.js";

const PlayerContext = createContext();

export const usePlayerContext = () => {
  return useContext(PlayerContext);
};

export const PlayerContextProvider = ({ children }) => {
  const [players, setPlayers] = useState([]);
  const [playersLoadingState, setPlayersLoadingState] = useState("loading");

  const loadPlayerData = async () => {
    const data = await fetchData();

    if (!data) {
      setPlayersLoadingState("error");
      return;
    }

    // filter players
    const namesAlreadyFound = [];
    const sanitizedPlayers = [];
    data.forEach((p) => {
      if (namesAlreadyFound.includes(p.Player)) return;
      namesAlreadyFound.push(p.Player);
      sanitizedPlayers.push(p);
    });

    setPlayers(sanitizedPlayers);
    setPlayersLoadingState("success");
  };

  // This useEffect means the function will only  be called once
  useEffect(() => {
    loadPlayerData();
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        players,
        playerLoadingState: playersLoadingState,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
