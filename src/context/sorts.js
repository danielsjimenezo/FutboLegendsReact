export const initialPlayerSorts = [
    {
        id: "games",
        label: {
            short: "Games",
            long: "Games Played"
        },
        sort(a, b) {
            return b.GamesPlayed - a.GamesPlayed
        },
        columnShown: true
    },
    {
        id: "goals",
        label: {
            short: "Goals",
            long: "Goals Scored"
        },
        sort(a, b) {
            return b.Goals - a.Goals
        },
        columnShown: true
    },
    {
        id: "assists",
        label: {
            short: "Assists",
            long: "Assists"
        },
        sort(a, b) {
            return b.Assists - a.Assists
        },
        columnShown: true
    },
    {
        id: "contributions",
        label: {
            short: "G+A",
            long: "Goals + Assists"
        },
        sort(a, b) {
            return (b.Goals + b.Assists) - (a.goals + a.Assists)
        },
        columnShown: true
    },
    {
        id: "efficiency",
        label: {
            short: "G+A/Game",
            long: "Goals + Assists per Game"
        },
        sort(a, b) {
            return b.Efficiency - a.Efficiency
        },
        columnShown: true
    },
    {
        id: "balon1",
        label: {
            short: "Balón (1st)",
            long: "Balón d'Or (1st Place)"
        },
        sort(a, b) {
            return b["Balon (1st)"] - a["Balon (1st)"]
        },
        columnShown: false
    },
    {
        id: "balon2",
        label: {
            short: "Balón (2nd)",
            long: "Balón d'Or (2nd Place)"
        },
        sort(a, b) {
            return b["Balon (2nd)"] - a["Balon (2nd)"]
        },
        columnShown: false
    },
    {
        id: "balon3",
        label: {
            short: "Balón (3rd)",
            long: "Balón d'Or (3rd Place)"
        },
        sort(a, b) {
            return b["Balon (3rd)"] - a["Balon (3rd)"]
        },
        columnShown: false
    },
]
