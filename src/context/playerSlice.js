import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit"
import { fetchData, getArrayFromLocalStorage } from "../utilities/utilities.js"
import { futbolDataTypes } from "../utilities/futbolDataTypes.jsx"
import { getFilteredPlayers, getMaxValues } from "./storeHelpers.js"

const initialColumns = [
    "games", "goals", "assists", "contributions", "efficiency"
]
const initialBadges = [
    "games", "goals", "assists", "contributions", "efficiency", "balon1", "balon2", "balon3"
]

const PER_PAGE = 15

export const loadPlayerData = createAsyncThunk('players/load', async () => {
    const data = await fetchData()
    return data || []
})

const playerSlice = createSlice({
    name: 'players',
    initialState: {
        players: [],
        loadingState: 'loading',
        playersPageNumber: 1,
        playerSort: 'contributions',
        secondChart: 'goals',
        countryFilter: 'all',
        positionFilter: 'all',
        shownColumns: getArrayFromLocalStorage('futbolegends::shownColumns', initialColumns),
        shownBadges: getArrayFromLocalStorage('futbolegends::shownBadges', initialBadges)
    },
    reducers: {
        turnPage: (state, action) => {
            const newPage = state.playersPageNumber + action.payload
            const filteredCount = Math.ceil(getFilteredPlayers(state).length / PER_PAGE)
            if (newPage >= 1 && newPage <= filteredCount) {
                state.playersPageNumber = newPage
            }
        },
        changeFilter: (state, action) => {
            const { key, value } = action.payload
            state.playersPageNumber = 1
            if (key === 'countries') state.countryFilter = value
            if (key === 'positions') state.positionFilter = value
        },
        toggleShownColumn: (state, action) => {
            const col = action.payload
            const i = state.shownColumns.indexOf(col)
            if (i === -1) state.shownColumns.push(col)
            else state.shownColumns.splice(i, 1)
            localStorage.setItem('futbolegends::shownColumns', JSON.stringify(state.shownColumns))
        },
        toggleShownBadge: (state, action) => {
            const badge = action.payload
            const i = state.shownBadges.indexOf(badge)
            if (i === -1) state.shownBadges.push(badge)
            else state.shownBadges.splice(i, 1)
            localStorage.setItem('futbolegends::shownBadges', JSON.stringify(state.shownBadges))
        },
        changeLeftChart: (state, action) => {
            const chartId = action.payload
            if (state.shownColumns.includes(chartId)) {
                state.playerSort = chartId
                return
            }
            if (state.shownColumns.length < 5) {
                state.shownColumns.push(chartId)
            } else {
                const rightmost = futbolDataTypes.find(t => state.shownColumns.includes(t.id))
                if (!rightmost) throw new Error("rightmost futbolType not found")
                const i = state.shownColumns.indexOf(rightmost.id)
                if (i !== -1) state.shownColumns.splice(i, 1)
                state.shownColumns.push(chartId)
            }
            state.playerSort = chartId
            localStorage.setItem('futbolegends::shownColumns', JSON.stringify(state.shownColumns))
        },
        setSecondChart: (state, action) => {
            state.secondChart = action.payload
        },
        setPlayerSort: (state, action) => {
            state.playerSort = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadPlayerData.pending, (state) => {
                state.loadingState = 'loading'
            })
            .addCase(loadPlayerData.fulfilled, (state, action) => {
                state.players = action.payload
                state.loadingState = 'success'
            })
            .addCase(loadPlayerData.rejected, (state) => {
                state.loadingState = 'error'
            })
    }
})

export const {
    turnPage,
    changeFilter,
    toggleShownColumn,
    toggleShownBadge,
    changeLeftChart,
    setSecondChart,
    setPlayerSort
} = playerSlice.actions

export const baseSelector = (state) => state.players;
export const selectPlayerState = createSelector([baseSelector], (s) => {
  const filtered = getFilteredPlayers(s);
  const startIndex = (s.playersPageNumber - 1) * PER_PAGE;
  const endIndex = s.playersPageNumber * PER_PAGE;

  const nameAndRankWidthPercent = 0.2;
  const rest = 1 - nameAndRankWidthPercent;
  const homeTableColumnWidth = ((rest / (s.shownColumns.length + 2)) * 100).toFixed(2) + "%";

  const countries = [...new Set(s.players.map(p => p.birthCountry))].filter(Boolean).sort();
  const positions = [...new Set(s.players.map(p => p.Position))].filter(Boolean).sort();

  return {
    ...s,
    countries,
    positions,
    displayedPlayers: filtered.slice(startIndex, endIndex),
    filteredPageCount: Math.ceil(filtered.length / PER_PAGE),
    maxValues: getMaxValues(s.players),
    homeTableColumnWidth,
    PER_PAGE,
    findPlayerById(id) {
      if (!id) return;
      return s.players.find(
        (p) => id.toString().replaceAll("_", " ") === p.Player
      );
    }
  };
});

export default playerSlice.reducer