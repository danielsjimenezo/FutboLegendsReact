import { useSelector, useDispatch } from "react-redux";
import { selectPlayerState, setPlayerSort } from "../context/playerSlice.js";

function PlayerTableTH({ sort, label }) {
  const dispatch = useDispatch();

  const { playerSort, shownColumns, homeTableColumnWidth } =
    useSelector(selectPlayerState);

  if (!shownColumns.includes(sort)) return <></>;

  return (
    <th style={{ width: homeTableColumnWidth }}>
      <button onClick={() => dispatch(setPlayerSort(sort))}>
        {label}
        {playerSort === sort && (
          <img
            src="/images/Icons/darr.png"
            className="sort-arrow"
            alt="down arrow"
          />
        )}
      </button>
    </th>
  );
}

export default PlayerTableTH;
