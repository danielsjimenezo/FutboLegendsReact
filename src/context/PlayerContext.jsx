import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { fetchData, getArrayFromLocalStorage } from "../utilities/utilities.js";
import { futbolDataTypes } from "../utilities/futbolDataTypes.jsx";

const PER_PAGE = 15;

const PlayerContext = createContext();

export const usePlayerContext = () => {
  return useContext(PlayerContext);
};

export const PlayerContextProvider = ({ children }) => {
  ///// STATE /////
  const [players, setPlayers] = useState([]);
  const [playersLoadingState, setPlayersLoadingState] = useState("loading");
  const [playersPageNumber, setPlayersPageNumber] = useState(1);
  const [playerSort, setPlayerSort] = useState("contributions");
  const [secondChart, setSecondChart] = useState("goals");
  const [countryFilter, setCountryFilter] = useState("all");
  const [positionFilter, setPositionFilter] = useState("all");

  const initialColumns = [
    "games",
    "goals",
    "assists",
    "contributions",
    "efficiency",
  ];
  const [shownColumns, setShownColumns] = useState(
    getArrayFromLocalStorage("futbolegends::shownColumns", initialColumns)
  );
  useEffect(
    () =>
      localStorage.setItem(
        "futbolegends::shownColumns",
        JSON.stringify(shownColumns)
      ),
    [shownColumns]
  );

  const initialBadges = [
    "games",
    "goals",
    "assists",
    "contributions",
    "efficiency",
    "balon1",
    "balon2",
    "balon3",
  ];
  const [shownBadges, setShownBadges] = useState(
    getArrayFromLocalStorage("futbolegends::shownBadges", initialBadges)
  );
  useEffect(
    () =>
      localStorage.setItem(
        "futbolegends::shownBadges",
        JSON.stringify(shownBadges)
      ),
    [shownBadges]
  );

  ///// DERIVED VALUES /////
  const [startIndex, endIndex] = [
    (playersPageNumber - 1) * PER_PAGE,
    playersPageNumber * PER_PAGE,
  ];

  const homeTableColumnWidth = (() => {
    const nameAndRankWidthPercent = 0.2;
    const rest = 1 - nameAndRankWidthPercent;
    return ((rest / (shownColumns.length + 2)) * 100).toFixed(2) + "%";
  })();

  const getFilteredPlayers = () => {
    let result = [...players];

    /// HANDLE FILTERS
    if (countryFilter !== "all") {
      result = result.filter((p) => p.birthCountry === countryFilter);
    }

    if (positionFilter !== "all") {
      result = result.filter((p) => p.Position === positionFilter);
    }

    /// HANDLE SORT
    result.sort((a, b) => {
      const type = futbolDataTypes.find((t) => t.id === playerSort);
      return type.sortAlg(a, b);
    });

    return result;
  };

  const filteredPlayers = getFilteredPlayers();

  const getDisplayedPlayers = () => {
    return filteredPlayers.slice(startIndex, endIndex);
  };

  const displayedPlayers = getDisplayedPlayers();
  // console.log("displayed players:", displayedPlayers);

  const filteredPageCount = Math.ceil(filteredPlayers.length / PER_PAGE);

  // filter options
  const countries = useMemo(() => {
    return [...new Set(players.map((p) => p.birthCountry))]
      .toSorted()
      .filter((c) => c);
  }, [players]);
  const positions = useMemo(() => {
    return [...new Set(players.map((p) => p.Position))]
      .toSorted()
      .filter((c) => c);
  }, [players]);

  const maxValues = useMemo(() => {
    return getMaxValues(players);
  }, [players]);

  const displayedCharts = (() => { })();

  ///// FETCHING DATA /////
  const loadPlayerData = async () => {
    const data = await fetchData();

    if (!data) {
      setPlayersLoadingState("error");
      return;
    }

    setPlayers(data);
    setPlayersLoadingState("success");
  };

  // This useEffect means the function will only  be called once
  useEffect(() => {
    loadPlayerData();
  }, []);

  ///// CONTEXT ACTIONS /////
  const actions = {
    turnPage(delta) {
      // delta is 1 for forward and -1 for back
      const newPageNumber = playersPageNumber + delta;
      if (newPageNumber < 1) return;
      if (newPageNumber > filteredPageCount) return;
      setPlayersPageNumber(newPageNumber);
    },
    changeFilter(key, value) {
      // key is "countries" or "positions"
      setPlayersPageNumber(1);
      switch (key) {
        case "countries":
          setCountryFilter(value);
          break;
        case "positions":
          setPositionFilter(value);
          break;
      }
    },
    findPlayerById(id) {
      if (!id) return;
      return players.find(
        (p) => id.toString().replaceAll("_", " ") === p.Player
      );
    },
    toggleShownColumn(sort) {
      const newColumns = [...shownColumns];
      const isIncludedColumn = newColumns.includes(sort);

      if (isIncludedColumn) {
        const index = newColumns.indexOf(sort);
        newColumns.splice(index, 1);
      } else {
        if (newColumns.length >= 5) {
          newColumns.pop();
        }
        newColumns.push(sort);
      }

      setShownColumns(newColumns);
    },
    toggleShownBadge(sort) {
      const newBadges = [...shownBadges];
      const i = newBadges.indexOf(sort);
      if (i === -1) {
        newBadges.push(sort);
      } else {
        newBadges.splice(i, 1);
      }
      setShownBadges(newBadges);
    },
    changeLeftChart(chartId) {
      // If the column is already shown, just update the playerSort
      if (shownColumns.includes(chartId)) {
        setPlayerSort(chartId);
        return;
      }

      // If there are less than five columns showing, it is ok to add one
      if (shownColumns.length < 5) {
        setShownColumns([...shownColumns, chartId]);
        return;
      }

      // Must determine the "rightmost (last)" futbolType and remove it.
      const rightmost = futbolDataTypes.find((t) =>
        shownColumns.includes(t.id)
      );

      // If not found, something is wrong. I don't think this will happen
      if (!rightmost) {
        throw new Error(
          "rightmost futbolType was not found. shownColumns:",
          shownColumns
        );
      }

      const newColumns = [...shownColumns];
      newColumns.splice(newColumns.indexOf(rightmost.id), 1);
      newColumns.push(chartId);
      setShownColumns(newColumns);
      setPlayerSort(chartId);
    },
  };

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
        setPlayerSort,
        secondChart,
        setSecondChart,
        shownColumns,
        homeTableColumnWidth,
        shownBadges,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

//////////// Utility

function getMaxValues(allPlayers) {
  const maxValues = {};

  const allGamesPlayed = allPlayers.map((p) => toNumber(p.GamesPlayed));
  maxValues.GamesPlayed = Math.max(...allGamesPlayed);

  const allGoals = allPlayers.map((p) => toNumber(p.Goals));
  maxValues.Goals = Math.max(...allGoals);

  const allAssists = allPlayers.map((p) => toNumber(p.Assists));
  maxValues.Assists = Math.max(...allAssists);

  const allContributions = allPlayers.map((p) => toNumber(p.GoalContributions));
  maxValues.GoalContributions = Math.max(...allContributions);

  const allEfficiencies = allPlayers.map((p) => toNumber(p.Efficiency));
  maxValues.Efficiency = Math.max(...allEfficiencies);

  const allBalon1 = allPlayers.map((p) => toNumber(p["Balon (1st)"]));
  const allBalon2 = allPlayers.map((p) => toNumber(p["Balon (2nd)"]));
  const allBalon3 = allPlayers.map((p) => toNumber(p["Balon (3rd)"]));

  maxValues.Balon = [
    Math.max(...allBalon1),
    Math.max(...allBalon2),
    Math.max(...allBalon3),
  ];

  return maxValues;
}

function toNumber(val = "") {
  if (typeof val === "number") return val;
  return Number(val.replaceAll(",", "")) || 0;
}
