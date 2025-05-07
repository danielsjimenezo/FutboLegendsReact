import { useSelector } from "react-redux";
import { selectPlayerState } from "../context/playerSlice.js";
import { futbolDataTypes } from "../utilities/futbolDataTypes.jsx";
import CompareBar from "./CompareBar.jsx";

function toNumber(val) {
  if (typeof val === "number") return val;
  return Number((val || "").replaceAll(",", "")) || 0;
}

function CompareStats({ player1, player2 }) {
  const { maxValues, shownCompareStats } = useSelector(selectPlayerState);

  if (!player1 || !player2) {
    return <h3 className="not-both-players">Select two players to compare.</h3>;
  }

  return (
    <div id="compare-stats">
      {futbolDataTypes
        .filter((type) => shownCompareStats.includes(type.id))
        .map((type) => {
          return (
            <CompareBar
              key={type.id}
              label={type.labelLong}
              val1={type.getPlayerValue(player1)}
              val2={type.getPlayerValue(player2)}
              max={maxValues[type.id] || 0}
            />
          );
        })}
      {/* <CompareBar
        label="Games"
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

      <CompareBar
        label="Balón d'Or (1st)"
        val1={toNumber(player1["Balon (1st)"])}
        val2={toNumber(player2["Balon (1st)"])}
        max={maxValues.Balon[0]}
      />

      <CompareBar
        label="Balón d'Or (2nd)"
        val1={toNumber(player1["Balon (2nd)"])}
        val2={toNumber(player2["Balon (2nd)"])}
        max={maxValues.Balon[1]}
      />

      <CompareBar
        label="Balón d'Or (3rd)"
        val1={toNumber(player1["Balon (3rd)"])}
        val2={toNumber(player2["Balon (3rd)"])}
        max={maxValues.Balon[2]}
      /> */}
    </div>
  );
}

export default CompareStats;
