import { useState, useRef } from "react";
import useClickOutside from "../utilities/useClickOutside.jsx";
import { usePlayerContext } from "../context/PlayerContext.jsx";
import { futbolDataTypes } from "../utilities/futbolDataTypes.jsx";

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
        {futbolDataTypes
          .filter((type) => playerSort !== type.id && secondChart !== type.id)
          .map((type) => {
            const key = `${id}|${type.id}`;
            return (
              <button
                key={key}
                onClick={() => {
                  setter(type.id);
                  setMenuShown(false);
                }}
              >
                {type.label}
              </button>
            );
          })}
      </div>
    </div>
  );
}

export default HomePageChartSelectorMenu;
