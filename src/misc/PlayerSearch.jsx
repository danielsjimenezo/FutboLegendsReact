import { useSelector } from "react-redux";
import { selectPlayerState } from "../context/playerSlice.js";
import { useState, useRef, useMemo } from "react";
import useClickOutside from "../utilities/useClickOutside.jsx";
import { Link } from "react-router-dom";

function PlayerSearch({ alwaysOpen = false, url, searchIcon = false }) {
  const { players, playersLoadingState } = useSelector(selectPlayerState);
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(alwaysOpen || false);
  const [isFocused, setIsFocused] = useState(false);
  const searchedPlayers = useMemo(() => {
    if (!searching || !isFocused) return [];
    if (query.length < 3) return players.slice(0, 10);
    return players.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, searching, players, isFocused]);

  // element references
  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);

  useClickOutside(searchContainerRef, () => {
    setQuery("");
    setSearching(alwaysOpen || false);
    setIsFocused(false);
  });

  if (playersLoadingState === "loading") {
    return <div>Loading...</div>;
  }

  if (playersLoadingState === "error") {
    return <div>Error</div>;
  }

  const handleInput = (e) => {
    setQuery(e.target.value.trim());
  };

  const handleSearchButton = () => {
    setSearching(true);
    setIsFocused(true);
    setTimeout(() => {
      searchInputRef.current.focus();
    }, 200);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    // Delay hiding suggestions to allow for clicking on them
    setTimeout(() => {
      setIsFocused(false);
    }, 200);
  };

  return (
    <div className="searchFunc" ref={searchContainerRef}>
      {searching ? (
        <div className="input-wrapper">
          {searchIcon && (
            <img
              className="searchIcon"
              src="/images/Icons/Search.png"
              alt="search icon"
            />
          )}
          <input
            type="text"
            id="searchInput"
            placeholder="Search players..."
            onInput={handleInput}
            onFocus={handleFocus}
            onBlur={handleBlur}
            ref={searchInputRef}
          />
        </div>
      ) : (
        <img
          src="/images/Icons/Search.png"
          alt=""
          className="topFilters"
          id="searchButton"
          onClick={handleSearchButton}
        />
      )}
      {searching && isFocused && (
        <section id="searchResults">
          {searchedPlayers.map((player) => {
            const playerHref = "/profile/" + player.name.replaceAll(" ", "_");
            const imgSrc = `/images/Players/${player.name}.jpg`;

            return (
              <div className="player-result" key={player.name}>
                <Link
                  className="searchResultBox"
                  to={url ? url(player) : playerHref}
                  onClick={() => {
                    setQuery("");
                    setSearching(alwaysOpen || false);
                    setIsFocused(false);
                  }}
                >
                  <img
                    src={imgSrc}
                    alt={player.name}
                    className="player-result-img"
                  />
                  <div className="player-result-info">
                    <p>{player.name}</p>
                  </div>
                </Link>
              </div>
            );
          })}
        </section>
      )}
    </div>
  );
}

export default PlayerSearch;
