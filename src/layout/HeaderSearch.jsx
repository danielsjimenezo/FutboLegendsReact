import { usePlayerContext } from "../context/PlayerContext.jsx";
import { useState, useRef } from "react";
import useClickOutside from "../utilities/useClickOutside.jsx";
import { Link } from "react-router-dom";

function HeaderSearch() {
  const { players, playersLoadingState } = usePlayerContext();
  const [searching, setSearching] = useState(false);
  const [searchedPlayers, setSearchedPlayers] = useState([]);

  // element references
  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);

  useClickOutside(searchContainerRef, () => {
    setSearching(false);
    setSearchedPlayers([]);
  });

  if (playersLoadingState === "loading") {
    return <div>Loading...</div>;
  }

  if (playersLoadingState === "error") {
    return <div>Error</div>;
  }

  const handleSearchButton = () => {
    setSearching(true);
    setTimeout(() => {
      searchInputRef.current.focus();
    }, 200);
  };

  const search = async (e) => {
    const query = e.currentTarget.value.toLowerCase();

    setSearchedPlayers(
      players.filter((player) => player.Player.toLowerCase().includes(query))
    );
  };
  return (
    <div id="searchFunc" ref={searchContainerRef}>
      {searching ? (
        <input
          type="text"
          id="searchInput"
          placeholder="Search players..."
          ref={searchInputRef}
          onKeyUp={search}
        />
      ) : (
        <img
          src="/images/Icons/Search.png"
          alt=""
          className="topFilters"
          id="searchButton"
          onClick={handleSearchButton}
        />
      )}
      <section id="searchResults">
        {searchedPlayers.map((player) => {
          const playerHref = "/profile/" + player.Player.replaceAll(" ", "_");
          const imgSrc = `/images/Players/${player.Player}.jpg`;

          return (
            <div className="player-result" key={player.Player}>
              <Link className="searchResultBox" to={playerHref}>
                <img
                  src={imgSrc}
                  alt={player.Player}
                  className="player-result-img"
                />
                <div className="player-result-info">
                  <p>{player.Player}</p>
                </div>
              </Link>
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default HeaderSearch;
