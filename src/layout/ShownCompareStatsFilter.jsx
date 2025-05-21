import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectPlayerState } from "../context/playerSlice.js";
import { toggleShownCompareStat } from "../context/playerSlice.js";
import useClickOutside from "../utilities/useClickOutside.jsx";
import { futbolDataTypes } from "../utilities/futbolDataTypes.js";

function ShownCompareStatsFilter({}) {
  const { shownCompareStats } = useSelector(selectPlayerState);
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
    dispatch(toggleShownCompareStat(choice));
  };

  return (
    <div id="shown-column-filter" className="filter-wrapper" ref={wrapperRef}>
      <button className="filter-button" onClick={toggleShown}>
        <span>STATS</span>
      </button>
      <div className={`filter-menu ${shown ? "shown" : ""}`}>
        {futbolDataTypes.map((type, i) => {
          const disabled =
            !shownCompareStats.includes(type.id) &&
            shownCompareStats.length >= 12;
          return (
            <button
              key={type.label}
              onClick={() => {
                if (disabled) {
                  return;
                }
                handleChoose(type.id);
              }}
            >
              {type.label}
              <input
                type="checkbox"
                checked={shownCompareStats.includes(type.id)}
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

export default ShownCompareStatsFilter;
