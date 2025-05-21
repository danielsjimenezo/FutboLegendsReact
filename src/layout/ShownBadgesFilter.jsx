import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleShownBadge } from "../context/playerSlice.js";
import { selectPlayerState } from "../context/playerSlice.js";
import useClickOutside from "../utilities/useClickOutside.jsx";
import { futbolDataTypes } from "../utilities/futbolDataTypes.js";

function ShownBadgesFilter({}) {
  const { shownBadges } = useSelector(selectPlayerState);
  const dispatch = useDispatch();

  const [shown, setShown] = useState(false);

  const wrapperRef = useRef(null);
  useClickOutside(wrapperRef, () => {
    setShown(false);
  });

  const toggleShown = () => {
    setShown(!shown);
  };

  const handleChoose = (choice) => {
    dispatch(toggleShownBadge(choice));
  };

  return (
    <div id="shown-badges-filter" className="filter-wrapper" ref={wrapperRef}>
      <button className="filter-button" onClick={toggleShown}>
        <img src="/images/Icons/hdots.svg" alt="3 dots menu" />
      </button>
      <div className={`filter-menu ${shown ? "shown" : ""}`}>
        {futbolDataTypes.map((type, i) => {
          const disabled =
            !shownBadges.includes(type.id) && shownBadges.length >= 8;
          return (
            <button key={type.label} onClick={() => handleChoose(type.id)}>
              {type.label}
              <input
                type="checkbox"
                checked={shownBadges.includes(type.id)}
                disabled={disabled}
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
