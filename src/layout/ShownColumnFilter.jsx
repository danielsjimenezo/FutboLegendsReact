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
function ShownColumnFilter({}) {
  const { shownColumns, actions } = usePlayerContext();

  const [shown, setShown] = useState(false);

  const wrapperRef = useRef(null);
  useClickOutside(wrapperRef, () => {
    setShown(false);
  });


  const toggleShown = () => {
    setShown(!shown);
  };

  const handleChoose = (choice) => {
    actions.toggleShownColumn(choice)
  };

  return (
    <div id="shown-column-filter" className="filter-wrapper" ref={wrapperRef}>
      <button className="filter-button" onClick={toggleShown}>
        <span>STATS</span>
      </button>
      <div className={`filter-menu ${shown ? "shown" : ""}`}>
        {menuItems.map(([label, sort], i) => {
          return (
            <button key={label} onClick={() => handleChoose(sort)}>
              {label}
              <input type="checkbox" checked={shownColumns.includes(sort)} readOnly/>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ShownColumnFilter;
