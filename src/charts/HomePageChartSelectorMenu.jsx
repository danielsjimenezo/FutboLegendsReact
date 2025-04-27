import { useState, useRef } from "react";
import useClickOutside from "../utilities/useClickOutside.jsx";
import { usePlayerContext } from "../context/PlayerContext.jsx";

function HomePageChartSelectorMenu({ LABELS, setter }) {
  const [menuShown, setMenuShown] = useState(false);
  const containerRef = useRef(null);
  const { playerSort, secondChart } = usePlayerContext();

  useClickOutside(containerRef, () => {
    setMenuShown(false);
  });

  return (
    <div className="selector-container" ref={containerRef}>
      <button onClick={() => setMenuShown(!menuShown)}>
        <img src="/images/Icons/hdots.svg" alt="" />
      </button>
      <div className={`menu filter-menu ${menuShown ? "shown" : ""}`}>
        {Object.entries(LABELS).map(([sortType, label]) => {
          // If chart is being used, do not render a button
          if (playerSort === sortType || secondChart === sortType) return <></>;

          return (
            <button
              key={sortType}
              onClick={() => {
                setter(sortType);
                setMenuShown(false);
              }}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default HomePageChartSelectorMenu;
