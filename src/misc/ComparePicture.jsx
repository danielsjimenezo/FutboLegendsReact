function ComparePicture({ player }) {
  return (
    <div className="compare-picture">
      {player ? (
        <img
          src={`/images/Players/${player.Player}.jpg`}
          alt={`Photo of ${player.Player}`}
          className={`${player.Active === 'TRUE' ? 'active' : 'inactive'}`}
        />
      ) : (
        <p className="none-selected">Select a player</p>
      )}
    </div>
  );
}

export default ComparePicture;
