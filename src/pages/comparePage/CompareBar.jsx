import { Link } from "react-router-dom";

function CompareBar({ player1, player2, label, val1, val2, max }) {
  const lengthPercent1 = (val1 / max) * 100;
  const lengthPercent2 = (val2 / max) * 100;

  const style1 = {
    width: lengthPercent1 + "%",
    backgroundImage: `linear-gradient(
            90deg,
            ${
              lengthPercent1 > lengthPercent2 ? "var(--green)" : "var(--pink)"
            } 50%,
            transparent 100%
        )`,
  };

  const style2 = {
    width: lengthPercent2 + "%",
    backgroundImage: `linear-gradient(
            90deg,
            transparent 0%,
            ${
              lengthPercent1 < lengthPercent2 ? "var(--green)" : "var(--pink)"
            } 50%
        )`,
  };

  return (
    <div className="compare-bar">
      <Link
        className="compare-bar-container left"
        to={`/profile/${player1.name.replaceAll(" ", "_")}`}
      >
        <div className="compare-bar-value">{val1.toLocaleString()}</div>
        <div className="compare-bar-fill" style={style1}></div>
      </Link>

      <div className="compare-bar-label">{label}</div>

      <Link
        className="compare-bar-container right"
        to={`/profile/${player2.name.replaceAll(" ", "_")}`}
      >
        <div className="compare-bar-fill" style={style2}></div>
        <div className="compare-bar-value">{val2.toLocaleString()}</div>
      </Link>
    </div>
  );
}

export default CompareBar;
