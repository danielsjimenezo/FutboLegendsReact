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
          className={`${
            location.pathname === "/current" ||
            location.pathname.startsWith("/league/")
              ? "active"
              : ""
          }`}
        >
          <button className="topButtons" id="currentButton">
            <span>Current</span>
          </button>
        </Link>
        <Link
          to="/"
          className={`${
            location.pathname === "/" ||
            location.pathname.startsWith("/profile")
              ? "active"
              : ""
          }`}
        >
          <button className="topButtons" id="recordButtonn">
            <span>Leaderboard</span>
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
            menuStyle={{
              minWidth: "unset",
              width: "150px",
            }}
          />

          {/* YEAR FILTER */}
          <DropdownFilter
            id="year-filter"
            filterKey="years"
            label={(value) => {
              return value.text === "all" ? "ALL-TIME" : value.text;
            }}
            menuStyle={{
              width: "100px",
              minWidth: "unset",
            }}
          />

          {/* POSITIONS FILTER */}
          <DropdownFilter
            filterKey="positions"
            label={(value) => {
              if (value.text == "all") {
                return "ALL";
              } else {
                return value.text.toUpperCase();
              }
            }}
            menuStyle={{
              minWidth: "unset",
              width: "100px",
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
