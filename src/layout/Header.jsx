import "./Header.css";
import { fetchData, onClickOutside } from "../utilities/utilities.js";
import { useState, useRef } from "react";

/*
    git init
    git remote add origin https://github.com/danielsjimenezo/FutboLegendsReact
    git add .
    git commit -m "first commit"

    git pull origin main --allow-unrelated-histories --no-rebase
    git push origin main

    git rm README.md
*/

function Header() {
  //   const searchFuncEl = document.getElementById("searchFunc");
  //   const searchButtonEl = document.getElementById("searchButton");
  //   const searchInputEl = document.getElementById("searchInput");
  //   const searchResultsEl = document.getElementById("searchResults");

  const [searching, setSearching] = useState(false);
  const [searchedPlayers, setSearchedPlayers] = useState([]);

  const searchInputRef = useRef(null);

  const handleSearchButton = () => {
    setSearching(true);
    setTimeout(() => {
      searchInputRef.current.focus();
    }, 200);
  };

  const search = async (e) => {
    const query = e.currentTarget.value.toLowerCase();
    const data = await fetchData();
    setSearchedPlayers(
      data.filter((player) => player.Player.toLowerCase().includes(query))
    );
  };

  //   searchInputEl.addEventListener("keyup", (e) => {
  //     if (e.key === "Enter") {
  //       search();
  //     }
  //   });

  //   onClickOutside(searchFuncEl, hideSearch);

  // functions

  //   function hideSearch() {
  //     searchResultsEl.innerHTML = "";
  //   }

  //   function displaySearchResults(results) {
  //     searchResultsEl.innerHTML = "";

  //     if (results.length === 0) {
  //       searchResultsEl.innerHTML = "<p>No players found</p>";
  //       return;
  //     }

  //     results.forEach((player) => {
  //       const playerEl = document.createElement("div");
  //       playerEl.classList.add("player-result");
  //       const playerHref = player.Player.replaceAll(" ", "_");
  //       playerEl.innerHTML = `
  //         <a class="searchResultBox" href="/profile.html?name=${playerHref}">
  //           <img src="./images/Players/${player.Player}.jpg" alt="${player.Player}" class="player-result-img">
  //           <div class="player-result-info">
  //             <p>${player.Player}</p>
  //           </div>
  //         </a>
  //       `;
  //       searchResultsEl.appendChild(playerEl);
  //     });
  //   }

  return (
    <header>
      <div id="searchFunc">
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
            const playerHref = player.Player.replaceAll(" ", "_");
            return (
              <div className="player-result">
                <a
                  className="searchResultBox"
                  href="/profile.html?name=${playerHref}"
                >
                  <img
                    src="./images/Players/${player.Player}.jpg"
                    alt="${player.Player}"
                    className="player-result-img"
                  />
                  <div className="player-result-info">
                    <p>{player.Player}</p>
                  </div>
                </a>
              </div>
            );
          })}
        </section>
      </div>
      <div id="nav">
        <button className="topButtons" id="recordButtonn">
          <a href="./index.html">Record Book</a>
        </button>
        <button className="topButtons" id="compareButtonn">
          <a href="./compare.html">Compare Players</a>
        </button>
      </div>

      <div id="filters">
        <div id="globe-filter-menu-wrapper">
          <button id="globe-filter">
            <img
              src="/images/Icons/global_icon.png"
              alt=""
              className="topFilters"
            />
          </button>
          <div
            id="globe-filter-menu"
            className="filter-menu hidden search-dropdown"
          >
            <button>World</button>
          </div>
        </div>
        <div id="filter-menu-wrapper">
          <button id="filter-button">
            <img src="/images/Icons/funnel.png" alt="" className="topFilters" />
          </button>
          <div id="filter-menu" className="filter-menu hidden search-dropdown">
            <button>All</button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
