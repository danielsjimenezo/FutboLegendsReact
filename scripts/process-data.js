import fs from 'fs'
import toPlayerDTO from './PlayerDTO.js'

const players = JSON.parse(fs.readFileSync('./public/Data/input.json'))
const write = arr => fs.writeFileSync('./public/Data/output.json', JSON.stringify(arr, null, 2))


let newPlayers = []
const usedNames = []

///// REMOVE DUPLICATES
players.forEach((player, i) => {
    // if used name, return
    if (usedNames.includes(player.Player)) return;
    const newPlayer = {...player}

    newPlayers.push(newPlayer)
    usedNames.push(player.Player)
})

///// CREATE DTO
newPlayers = newPlayers.map(p => toPlayerDTO(p, newPlayers))

const maxValueMap = {
    Goals: 'goals',
    GoalContributions: 'contributions',
    Assists: 'assists',
    GamesPlayed: 'games',
    Efficiency: 'efficiency',
    'Balon (1st)': 'balon1',
    'Balon (2nd)': 'balon2',
    'Balon (3rd)': 'balon3',
    'WC Goals': 'WC Goals',
    'WC Assists': 'WC Assists',
    'WC FGoals': 'WC FGoals',
    'WC GBall': 'WC GBall',
    'WC SBall': 'WC SBall',
    'WC BBall': 'WC BBall',
    'WC BBoot': 'WC GBoot',
    'WC SBoot': 'WC SBoot',
    'WC BBoot': 'WC BBoot',
    'UCL Goals': 'UCL Goals',
    'UCL Assists': 'UCL Assists',
    'UCL FGoals': 'UCL FGoals',
    'FreeKicks': 'FreeKicks',
    'Penalties': 'Penalties',
    'OutsideBox': 'OutsideBox',
    'InsideBox': 'InsideBox',
    'LeftFoot': 'LeftFoot',
    'RightFoot': 'RightFoot',
    'Headers': 'Headers',
}



// CALCULATE MAX VALUES
console.log("Calculating max values...")
const maxValues = newPlayers.reduce((result, player) => {
    Object.entries(maxValueMap).forEach(([dtoKey, typeId]) => {
        // add value if not exists
        if (!result[typeId]) result[typeId] = 0;

        // get player value
        const val = player[dtoKey]

        // if higher, overwrite
        if (val > result[typeId]) result[typeId] = val;
    })
    return result
}, {})

fs.writeFileSync('public/Data/maxValues.json', JSON.stringify(maxValues, null, 2))

write(newPlayers)