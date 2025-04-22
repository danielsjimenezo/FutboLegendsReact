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

write(newPlayers)