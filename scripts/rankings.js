import { numberKeys } from "./util.js"

export default function findRankings(players) {
    const countries = [...new Set(players.map(p => p.birthCountry))]
    const positions = [...new Set(players.map(p => p.position))]

    // World rankings
    console.log("Calculating world rankings...")
    players.forEach((p, i) => {
        if (i % 100 === 0) {
            console.log(`${((i / players.length) * 100).toFixed(1)}%`)
        }
        numberKeys.forEach(k => {
            const sorted = players.toSorted((a, b) => {
                return b[k] - a[k]
            })
            sorted.forEach((q, i) => {
                addRanking(q, 'world', k, i + 1)
            })
        })
    })

    // Country rankings
    console.log("Calculating country rankings...")
    countries.forEach(c => {
        console.log(`| ${c}`)
        numberKeys.forEach(k => {
            const sorted = players
                .filter(p => {
                    return p.birthCountry === c
                })
                .toSorted((a, b) => {
                    return b[k] - a[k]
                })

            sorted.forEach((q, i) => {
                addRanking(q, 'country', k, i + 1)
            })
        })
    })

    ///////// position rankings
    positions.forEach(pos => {
        const filtered = players.filter(p => p.position === pos)

        // World rankings
        console.log("Calculating world rankings (position)...")
        filtered.forEach((p, i) => {
            if (i % 100 === 0) {
                console.log(`${((i / filtered.length) * 100).toFixed(1)}%`)
            }
            numberKeys.forEach(k => {
                const sorted = filtered.toSorted((a, b) => {
                    return b[k] - a[k]
                })
                sorted.forEach((q, i) => {
                    addRanking(q, 'worldPosition', k, i + 1)
                })
            })
        })

        // Country rankings
        console.log("Calculating country rankings (position)...")
        countries.forEach(c => {
            console.log(`| ${c}`)
            numberKeys.forEach(k => {
                const sorted = filtered
                    .filter(p => {
                        return p.birthCountry === c
                    })
                    .toSorted((a, b) => {
                        return b[k] - a[k]
                    })

                sorted.forEach((q, i) => {
                    addRanking(q, 'countryPosition', k, i + 1)
                })
            })
        })

    })
}

// scope is "world", "country", "worldPosition", or "countryPosition"
function addRanking(player, scope, key, value) {
    if (!player.rankings) player.rankings = {}
    if (!player.rankings[scope]) player.rankings[scope] = {}
    player.rankings[scope][key] = value
}
