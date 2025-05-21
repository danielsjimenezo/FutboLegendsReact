import fs from 'fs'
import appendTeamAndCompData from './teamsAndComps.js'
import { numberKeys } from './util.js'
import findRankings from './rankings.js'
import cleanup from './cleanup.js'

const INPUT = './public/Data/input.json'
const OUTPUT = './public/Data/output.json'

const players = JSON.parse(fs.readFileSync(INPUT))
const write = arr => fs.writeFileSync(OUTPUT, JSON.stringify(arr, null, 2))


let newPlayers = []
const usedNames = []

function fixNumbers(dto) {
    numberKeys.forEach(key => {
        if (typeof dto[key] !== 'string') return;
        dto[key] = Number(dto[key].replaceAll(',','')) || 0
    })
}


///// REMOVE DUPLICATES
players.forEach((player, i) => {
    // if used name, return
    if (usedNames.includes(player.name)) return;
    const newPlayer = {...player}
    fixNumbers(newPlayer)
    newPlayers.push(newPlayer)
    usedNames.push(player.name)
})

//// FIND RANKINGS
console.log("Number of players:", newPlayers.length)
findRankings(newPlayers)

///// CREATE DTO
newPlayers = newPlayers.map(p => appendTeamAndCompData(p, newPlayers))

// CALCULATE MAX VALUES
console.log("Calculating max values...")
const maxValues = newPlayers.reduce((result, player) => {
    numberKeys.forEach((key) => {
        // add value if not exists
        if (!result[key]) result[key] = 0;

        // get player value
        const val = player[key]

        // if higher, overwrite
        if (val > result[key]) result[key] = val;
    })
    return result
}, {})

//// Clean up
cleanup(newPlayers)

fs.writeFileSync('public/Data/maxValues.json', JSON.stringify(maxValues, null, 2))

write(newPlayers)

console.log("DONE")