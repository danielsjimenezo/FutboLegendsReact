import { fetchData } from "/Javascript/Utilities/fetchData.js";
import { onClickOutside } from "../../Javascript/Utilities/defineFilterHandlers.js";

const searchFuncEl = document.getElementById("searchFunc");
const searchButtonEl = document.getElementById("searchButton");
const searchInputEl = document.getElementById("searchInput");
const searchResultsEl = document.getElementById("searchResults");

searchButtonEl.addEventListener("click", () => {
  searchButtonEl.classList.add("hidden");
  searchInputEl.classList.remove("hidden");
  searchInputEl.focus();
});

searchInputEl.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    search();
  }
});

onClickOutside(searchFuncEl, hideSearch);

// functions

function hideSearch() {
  searchResultsEl.innerHTML = "";
}

async function search() {
  const query = searchInputEl.value.toLowerCase();
  const data = await fetchData();
  const results = data.filter((player) =>
    player.name.toLowerCase().includes(query)
  );

  displaySearchResults(results);
}

function displaySearchResults(results) {
  searchResultsEl.innerHTML = "";

  if (results.length === 0) {
    searchResultsEl.innerHTML = "<p>No players found</p>";
    return;
  }

  results.forEach((player) => {
    const playerEl = document.createElement("div");
    playerEl.classList.add("player-result");
    const playerHref = player.name.replaceAll(" ", "_");
    playerEl.innerHTML = `
        <a class="searchResultBox" href="/profile.html?name=${playerHref}">
          <img src="./images/Players/${player.name}.jpg" alt="${player.name}" class="player-result-img">
          <div class="player-result-info">
            <p>${player.name}</p>
          </div>
        </a>
      `;
    searchResultsEl.appendChild(playerEl);
  });
}
