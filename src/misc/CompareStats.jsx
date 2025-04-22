import { usePlayerContext } from "../context/PlayerContext.jsx"
import CompareBar from "./CompareBar.jsx"

function toNumber(val) {
  if (typeof val === "number") return val;
  return Number(val.replaceAll(",", "")) || 0;
}


function CompareStats({ player1, player2 }) {

    const { maxValues } = usePlayerContext()

    if (!player1 || !player2) {
        return (
            <h3 className="not-both-players">
                Select two players to compare.
            </h3>
        )
    }

    return (
        <div id="compare-stats">
            <CompareBar 
                label="Games Played"
                val1={toNumber(player1.GamesPlayed)}
                val2={toNumber(player2.GamesPlayed)}
                max={maxValues.GamesPlayed}
            />

            <CompareBar 
                label="Goals"
                val1={toNumber(player1.Goals)}
                val2={toNumber(player2.Goals)}
                max={maxValues.Goals}
            />

            <CompareBar 
                label="Assists"
                val1={toNumber(player1.Assists)}
                val2={toNumber(player2.Assists)}
                max={maxValues.Assists}
            />

            <CompareBar 
                label="Goals + Assists"
                val1={toNumber(player1.GoalContributions)}
                val2={toNumber(player2.GoalContributions)}
                max={maxValues.GoalContributions}
            />

            <CompareBar 
                label="Efficiency"
                val1={toNumber(player1.Efficiency)}
                val2={toNumber(player2.Efficiency)}
                max={maxValues.Efficiency}
            />
        </div>
    )
}

export default CompareStats