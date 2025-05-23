import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import { fetchData, getArrayFromLocalStorage } from "../utilities/utilities.js";
import { getFilteredPlayers } from "./storeHelpers.js";
import { futbolDataTypes } from "../utilities/futbolDataTypes.js";

const initialColumns = [
  "games",
  "goals",
  "assists",
  "contributions",
  "efficiency",
];

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

const initialCompareStats = [
  "games",
  "goals",
  "assists",
  "contributions",
  "efficiency",
  "balon1",
  "wcGoals",
  "wcAssists",
  "uclGoals",
  "uclAssists",
  "freekicks",
  "penalties"
];

const PER_PAGE = 15;

export const loadPlayerData = createAsyncThunk("players/load", async () => {
  const data = await fetchData();
  return data || [];
});

export const loadMaxValues = createAsyncThunk(
  "players/loadMaxValues",
  async () => {
    const res = await fetch("/Data/maxValues.json");
    const data = await res.json();
    return data;
  }
);

const playerSlice = createSlice({
  name: "players",
  initialState: {
    players: [],
    loadingState: "loading",
    playersPageNumber: 1,
    playerSort: "contributions",
    secondChart: "goals",
    countryFilter: "all",
    positionFilter: "all",
    // shownColumns: getArrayFromLocalStorage(
    //   "futbolegends::shownColumns",
    //   initialColumns
    // ),
    shownColumns: initialColumns,
    // shownBadges: getArrayFromLocalStorage(
    //   "futbolegends::shownBadges",
    //   initialBadges
    // ),
    shownBadges: initialBadges,
    // shownCompareStats: getArrayFromLocalStorage(
    //   "futbolegends::shownCompareStats",
    //   initialCompareStats
    // ),
    shownCompareStats: initialCompareStats,
    maxValues: {},
    leaderboardCountry: "all",
    leaderboardPosition: "all"
  },
  reducers: {
    turnPage: (state, action) => {
      const newPage = state.playersPageNumber + action.payload;
      const filteredCount = Math.ceil(
        getFilteredPlayers(state).length / PER_PAGE
      );
      if (newPage >= 1 && newPage <= filteredCount) {
        state.playersPageNumber = newPage;
      }
    },
    changeFilter: (state, action) => {
      const { key, value } = action.payload;
      state.playersPageNumber = 1;
      if (key === "countries") state.countryFilter = value;
      if (key === "positions") state.positionFilter = value;
    },
    toggleShownColumn: (state, action) => {
      const col = action.payload;
      const i = state.shownColumns.indexOf(col);
      if (i === -1) state.shownColumns.push(col);
      else state.shownColumns.splice(i, 1);
      // localStorage.setItem(
      //   "futbolegends::shownColumns",
      //   JSON.stringify(state.shownColumns)
      // );
    },
    toggleShownBadge: (state, action) => {
      const badge = action.payload;
      const i = state.shownBadges.indexOf(badge);
      if (i === -1) {
        if (state.shownBadges.length >= 8) return;
        state.shownBadges.push(badge);
      } else {
        state.shownBadges.splice(i, 1);
      }
      // localStorage.setItem(
      //   "futbolegends::shownBadges",
      //   JSON.stringify(state.shownBadges)
      // );
    },
    toggleShownCompareStat: (state, action) => {
      const stat = action.payload;
      const i = state.shownCompareStats.indexOf(stat);
      if (i === -1) {
        if (state.shownCompareStats.length >= 12) return;
        state.shownCompareStats.push(stat);
      } else {
        state.shownCompareStats.splice(i, 1);
      }
      // localStorage.setItem(
      //   "futbolegends::shownCompareStats",
      //   JSON.stringify(state.shownCompareStats)
      // );
    },
    changeLeftChart: (state, action) => {
      const chartId = action.payload;
      if (state.shownColumns.includes(chartId)) {
        state.playerSort = chartId;
        return;
      }
      if (state.shownColumns.length < 5) {
        state.shownColumns.push(chartId);
      } else {
        const rightmost = futbolDataTypes.find((t) =>
          state.shownColumns.includes(t.id)
        );
        if (!rightmost) throw new Error("rightmost futbolType not found");
        const i = state.shownColumns.indexOf(rightmost.id);
        if (i !== -1) state.shownColumns.splice(i, 1);
        state.shownColumns.push(chartId);
      }
      state.playerSort = chartId;
      // localStorage.setItem(
      //   "futbolegends::shownColumns",
      //   JSON.stringify(state.shownColumns)
      // );
    },
    setSecondChart: (state, action) => {
      state.secondChart = action.payload;
    },
    setPlayerSort: (state, action) => {
      state.playerSort = action.payload;
    },
    toggleLeaderboardCountry: (state) => {
      state.leaderboardCountry = state.leaderboardCountry === 'all' ? 'native' : 'all'
    },
    setLeaderboardPosition: (state, action) => {
      state.leaderboardPosition = action.payload || "all"
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPlayerData.pending, (state) => {
        state.loadingState = "loading";
      })
      .addCase(loadPlayerData.fulfilled, (state, action) => {
        state.players = action.payload;
        state.loadingState = "success";
      })
      .addCase(loadPlayerData.rejected, (state) => {
        state.loadingState = "error";
      })
      .addCase(loadMaxValues.fulfilled, (state, action) => {
        state.maxValues = action.payload;
      });
  },
});

export const {
  turnPage,
  changeFilter,
  toggleShownColumn,
  toggleShownBadge,
  toggleShownCompareStat,
  changeLeftChart,
  setSecondChart,
  setPlayerSort,
  toggleLeaderboardCountry,
  setLeaderboardPosition
} = playerSlice.actions;

export const baseSelector = (state) => state.players;
export const selectPlayerState = createSelector([baseSelector], (s) => {
  const filtered = getFilteredPlayers(s);
  const startIndex = (s.playersPageNumber - 1) * PER_PAGE;
  const endIndex = s.playersPageNumber * PER_PAGE;

  const nameAndRankWidthPercent = 0.2;
  const rest = 1 - nameAndRankWidthPercent;
  const homeTableColumnWidth =
    ((rest / (s.shownColumns.length + 2)) * 100).toFixed(2) + "%";

  const countries = [...new Set(s.players.map((p) => p.birthCountry))]
    .filter(Boolean)
    .sort();
  const positions = [...new Set(s.players.map((p) => p.position))]
    .filter(Boolean)
    .sort();

  return {
    ...s,
    countries,
    positions,
    displayedPlayers: filtered.slice(startIndex, endIndex),
    filteredPageCount: Math.ceil(filtered.length / PER_PAGE),
    homeTableColumnWidth,
    PER_PAGE,
    findPlayerById(id) {
      if (!id) return;
      return s.players.find(
        (p) => id.toString().replaceAll("_", " ") === p.name
      );
    },
    getRandomPlayers(amt) {
      const result = []
      for (let i = 0; i < amt; i++) {
        result.push(s.players[Math.floor(Math.random()*s.players.length)])
      }
      return result.filter(Boolean)
    }
  };
});

export default playerSlice.reducer;
