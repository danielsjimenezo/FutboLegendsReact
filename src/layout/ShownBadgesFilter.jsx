import { useState, useRef } from "react";
import { usePlayerContext } from "../context/PlayerContext.jsx";
import useClickOutside from "../utilities/useClickOutside.jsx";
import { futbolDataTypes } from "../utilities/futbolDataTypes.jsx";

function ShownBadgesFilter({}) {
  const { shownBadges, actions } = usePlayerContext();

  const [shown, setShown] = useState(false);

  const wrapperRef = useRef(null);
  useClickOutside(wrapperRef, () => {
    setShown(false);
  });

  const toggleShown = () => {
    setShown(!shown);
  };

  const handleChoose = (choice) => {
    actions.toggleShownBadge(choice);
  };

  return (
    <div id="shown-badges-filter" className="filter-wrapper" ref={wrapperRef}>
      <button className="filter-button" onClick={toggleShown}>
        <img src="/images/Icons/hdots.svg" alt="3 dots menu" />
      </button>
      <div className={`filter-menu ${shown ? "shown" : ""}`}>
        {futbolDataTypes.map((type, i) => {
          return (
            <button key={type.label} onClick={() => handleChoose(type.id)}>
              {type.label}
              <input
                type="checkbox"
                checked={shownBadges.includes(type.id)}
                readOnly
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ShownBadgesFilter;
