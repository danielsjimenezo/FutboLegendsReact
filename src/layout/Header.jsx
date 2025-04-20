import "./Header.css";
import HeaderSearch from "./HeaderSearch.jsx";

function Header() {
  return (
    <header>
      <HeaderSearch />
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
            <img src="/images/Icons/Funnel.png" alt="" className="topFilters" />
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
