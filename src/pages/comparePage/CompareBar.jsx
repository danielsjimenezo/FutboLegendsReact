import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const SPEED = 2000;

function countUpInnerTextNumber(el, n) {
  // Interval
  const ms = SPEED / n;
  let v = 0;
  const interval = setInterval(() => {
    // Stop when target reached
    if (v >= n) {
      el.innerText = n.toLocaleString();
      clearInterval(interval);
    }

    v++;

    el.innerText = v.toLocaleString();
  }, ms);
}

function CompareBar({ player1, player2, label, val1, val2, max }) {
  const lengthPercent1 = (val1 / max) * 100;
  const lengthPercent2 = (val2 / max) * 100;
  const [widths, setWidths] = useState([0, 0]);
  const mountedRef = useRef(false);
  const valRef1 = useRef(null);
  const valRef2 = useRef(null);

  const style1 = {
    width: widths[0] + "%",
    backgroundImage: `linear-gradient(
            90deg,
            ${
              lengthPercent1 > lengthPercent2 ? "var(--green)" : "var(--pink)"
            } 50%,
            transparent 100%
        )`,
    transition: `width ${(lengthPercent1 * SPEED) / 100}ms`,
  };

  const style2 = {
    width: widths[1] + "%",
    backgroundImage: `linear-gradient(
            90deg,
            transparent 0%,
            ${
              lengthPercent1 < lengthPercent2 ? "var(--green)" : "var(--pink)"
            } 50%
        )`,
    transition: `width ${(lengthPercent2 * SPEED) / 100}ms`,
  };

  useEffect(() => {
    // Prevent dual mount in safe mode
    if (mountedRef.current) return;

    setTimeout(() => {
      setWidths([lengthPercent1, lengthPercent2]);
    }, 100);

    // countUpInnerTextNumber(valRef1.current, val1)
    // countUpInnerTextNumber(valRef2.current, val2)

    mountedRef.current = true;
  }, []);

  return (
    <div className="compare-bar">
      <Link
        className="compare-bar-container left"
        to={`/dashboard/profile/${player1.name.replaceAll(" ", "_")}`}
      >
        <div className="compare-bar-value" ref={valRef1}>
          {val1.toLocaleString()}
        </div>
        <div className="compare-bar-fill" style={style1}></div>
      </Link>

      <div className="compare-bar-label">{label}</div>

      <Link
        className="compare-bar-container right"
        to={`/dashboard/dashboard/profile/${player2.name.replaceAll(" ", "_")}`}
      >
        <div className="compare-bar-fill" style={style2}></div>
        <div className="compare-bar-value" ref={valRef2}>
          {val2.toLocaleString()}
        </div>
      </Link>
    </div>
  );
}

export default CompareBar;
