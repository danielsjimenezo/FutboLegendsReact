import { Link } from "react-router-dom";

function ComparePicture({ player }) {
  return (
    <Link
      className="compare-picture"
      to={`/dashboard/profile/${player.name.replaceAll(" ", "_")}`}
    >
      {player ? (
        <img
          src={`/images/Players/${player.name}.jpg`}
          alt={`Photo of ${player.name}`}
          className={`${player.active ? "active" : "inactive"}`}
        />
      ) : (
        <p className="none-selected">Select a player</p>
      )}
    </Link>
  );
}

export default ComparePicture;
