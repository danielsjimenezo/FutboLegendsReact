import { useState, useRef } from "react";
import { usePlayerContext } from "../context/PlayerContext.jsx";
import useClickOutside from "../utilities/useClickOutside.jsx";

const menuItems = [
  ['Games', 'games'],
  ['Goals', 'goals'],
  ['Assists', 'assists'],
  ['G+A', 'contributions'],
  ['G+A/game', 'efficiency'],
  ['Balón (1)', 'balon1'],
  ['Balón (2)', 'balon2'],
  ['Balón (3)', 'balon3']
]
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
    actions.toggleShownBadge(choice)
  };

  return (
    <div id="shown-badges-filter" className="filter-wrapper" ref={wrapperRef}>
      <button className="filter-button" onClick={toggleShown}>
        <img src="/images/Icons/hdots.svg" alt="3 dots menu" />
      </button>
      <div className={`filter-menu ${shown ? "shown" : ""}`}>
        {menuItems.map(([label, sort], i) => {
          return (
            <button key={label} onClick={() => handleChoose(sort)}>
              {label}
              <input type="checkbox" checked={shownBadges.includes(sort)} readOnly/>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ShownBadgesFilter;
