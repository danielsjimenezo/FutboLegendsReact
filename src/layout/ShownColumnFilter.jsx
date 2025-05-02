import { useState, useRef } from "react";
import { usePlayerContext } from "../context/PlayerContext.jsx";
import useClickOutside from "../utilities/useClickOutside.jsx";

function ShownColumnFilter({}) {
  const { shownColumns, actions } = usePlayerContext();

  const [shown, setShown] = useState(false);

  const wrapperRef = useRef(null);
  useClickOutside(wrapperRef, () => {
    setShown(false);
  });

  const menuItems = Object.keys(shownColumns).map((name) => {
    return { text: name };
  });

  const toggleShown = () => {
    setShown(!shown);
  };

  const handleChoose = (choice, i) => {
    actions.toggleShownColumn(choice.text)
  };

  return (
    <div id="shown-column-filter" className="filter-wrapper" ref={wrapperRef}>
      <button className="filter-button" onClick={toggleShown}>
        <span>Columns</span>
      </button>
      <div className={`filter-menu ${shown ? "shown" : ""}`}>
        {menuItems.map((item, i) => {
          return (
            <button key={item.text} onClick={() => handleChoose(item, i)}>
              {item.text}
              <input type="checkbox" checked={shownColumns[item.text]} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ShownColumnFilter;
