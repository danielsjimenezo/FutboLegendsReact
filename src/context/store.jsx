import { atom, useAtom } from "jotai";
import { countries } from "../utilities/countries.js";
import { initialPlayerSorts } from "./sorts.js";

const PER_PAGE = 15

export const atoms = {
    // atoms
    players: atom([]),
    playersLoadingState: atom('loading'),
    playersPageNumber: atom(1),
    playerSorts: atom(initialPlayerSorts),
    playerSort: atom("contributions"),
    secondChart: atom("goals"),
    countryFilter: atom("all"),
    positionFilter: atom("all")
}

////////////////////////
///// DERIVED ATOMS ////
////////////////////////

atoms.indices = atom(get => {
    const page = get(atoms.playersPageNumber)
    return [
        (page - 1) * PER_PAGE,
        page * PER_PAGE,
    ]
})

atoms.filteredPlayers = atom(get => {
    let result = [...get(atoms.players)];
    const countryFilter = get(atoms.countryFilter)
    const positionFilter = get(atoms.positionFilter)
    const playerSorts = get(atoms.playerSorts)
    const playerSort = get(atoms.playerSort)

    /// HANDLE FILTERS
    if (countryFilter !== "all") {
      result = result.filter((p) => p.birthCountry === countryFilter);
    }

    if (positionFilter !== "all") {
      result = result.filter((p) => p.Position === positionFilter);
    }

    /// HANDLE SORT
    const sortFn = playerSorts.find(s => s.id === playerSort).sort
    result.sort(sortFn);

    return result;
}) // end filtered players

atoms.displayedPlayers = atom(get => {
    const filtered = get(atoms.filteredPlayers)
    const [start, end] = get(atoms.indices)
    return filtered.slice(start, end)
})

//////////////////
//// ACTIONS /////
//////////////////

atoms.test = atom(undefined, get => {

})

export function useFutbolStore(keys) {
    if (!Array.isArray(keys)) {
        throw new Error(`You must pass an array of keys to useFutbolStore.`)
    }

    const store = {
        get: {},
        set: {},
        actions: {}
    }

    for (const key of keys) {        
        const [x, y] = useAtom(atoms[key])

        // if x is not undefined it is a normal atom
        if (x !== undefined) {
            store.get[key] = x
            store.set[key] = y
        }

        // if x IS undefined, it is an "action"
        if (x === undefined) {
            store.actions[key] = x
        }
    }

    return store
}