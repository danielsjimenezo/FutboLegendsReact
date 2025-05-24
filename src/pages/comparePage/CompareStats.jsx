import { useSelector } from "react-redux";
import { selectPlayerState } from "@/context/playerSlice.js";
import { futbolDataTypes } from "@/utilities/futbolDataTypes.js";
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
          // console.log(type.id, maxValues)
          return (
            <CompareBar
              key={type.id}
              label={type.labelLong}
              player1={player1}
              player2={player2}
              val1={player1[type.id]}
              val2={player2[type.id]}
              max={type.dataCeiling || maxValues[type.id] || 0}
            />
          );
        })}
    </div>
  );
}

export default CompareStats;
