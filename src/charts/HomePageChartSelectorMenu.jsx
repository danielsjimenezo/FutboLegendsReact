import { useState, useRef } from "react";
import useClickOutside from "../utilities/useClickOutside.jsx";
import { useSelector } from "react-redux";
import { selectPlayerState } from "../context/playerSlice.js";
import { futbolDataTypes } from "../utilities/futbolDataTypes.js";

function HomePageChartSelectorMenu({ LABELS, setter, id }) {
  const [menuShown, setMenuShown] = useState(false);
  const containerRef = useRef(null);
  const { playerSort, secondChart } = useSelector(selectPlayerState);

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
