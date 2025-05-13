import "./Header.css";
import PlayerSearch from "../misc/PlayerSearch.jsx";
import { Link } from "react-router-dom";
import DropdownFilter from "./DropdownFilter.jsx";
import ShownColumnFilter from "./ShownColumnFilter.jsx";
import ShownCompareStatsFilter from "./ShownCompareStatsFilter.jsx";
import { useLocation } from "react-router-dom";
import { getFlagUrl } from "../utilities/countries.js";
import LimitToPages from "../misc/LimitToPages.jsx";

function Header() {
  const location = useLocation();
  // console.log("pathname:", location.pathname, location.pathname === '/');

  return (
    <header className="container">
      <div className="left">
        <div className="user">
          <p>G</p>
        </div>
        <PlayerSearch />
      </div>
      <nav id="nav">
        <Link
          to="/current"
          className={`${location.pathname === "/current" ? "active" : ""}`}
        >
          <button className="topButtons" id="currentButton">
            <span>Current</span>
          </button>
        </Link>
        <Link to="/" className={`${location.pathname === "/" ? "active" : ""}`}>
          <button className="topButtons" id="recordButtonn">
            <span>All-time</span>
          </button>
        </Link>
        <Link
          to="/compare"
          className={`${
            location.pathname.startsWith("/compare") ? "active" : ""
          }`}
        >
          <button className="topButtons" id="compareButtonn">
            <span>Compare</span>
          </button>
        </Link>
        <Link
          to="/rankings"
          className={`${location.pathname === "/rankings" ? "active" : ""}`}
        >
          <button className="topButtons" id="compareButtonn">
            <span>Rankings</span>
          </button>
        </Link>
      </nav>

      <div id="filters">
        <LimitToPages pages={["home"]}>
          {/* COUNTRY FILTER */}
          <DropdownFilter
            id="country-filter"
            icon={(value) => {
              if (!value || value.text == "all") {
                return `/images/Icons/global_icon.png`;
              } else {
                return getFlagUrl(value.text);
              }
            }}
            filterKey="countries"
            label={(value) => {
              if (value.text == "all") {
                return "WORLD";
              } else {
                return value.text.toUpperCase().slice(0, 3);
              }
            }}
          />

          {/* POSITIONS FILTER */}
          <DropdownFilter
            filterKey="positions"
            label={(value) => {
              if (value.text == "all") {
                return "POSITIONS";
              } else {
                return value.text.toUpperCase();
              }
            }}
          />
        </LimitToPages>

        <LimitToPages pages={["home"]}>
          <ShownColumnFilter />
        </LimitToPages>

        <LimitToPages pages={["compare"]}>
          <ShownCompareStatsFilter />
        </LimitToPages>
      </div>
      {/* end of filters */}
    </header>
  );
}

export default Header;
