import { useState, useRef } from "react";
import useClickOutside from "../utilities/useClickOutside.jsx";
import { usePlayerContext } from "../context/PlayerContext.jsx";

function HomePageChartSelectorMenu({ LABELS, setter, id }) {
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
        {Object.entries(LABELS)
          .filter(([sortType, label]) => playerSort !== sortType && secondChart !== sortType)
          .map(([sortType, label]) => {

          const key = `${id}|${sortType}`
          return (
            <button
              key={key}
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
