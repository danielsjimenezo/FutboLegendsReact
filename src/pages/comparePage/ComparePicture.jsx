function ComparePicture({ player }) {
  return (
    <div className="compare-picture">
      {player ? (
        <img
          src={`/images/Players/${player.name}.jpg`}
          alt={`Photo of ${player.name}`}
          className={`${player.active ? 'active' : 'inactive'}`}
        />
      ) : (
        <p className="none-selected">Select a player</p>
      )}
    </div>
  );
}

export default ComparePicture;
