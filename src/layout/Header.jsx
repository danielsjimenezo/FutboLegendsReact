import "./Header.css";
import PlayerSearch from "../misc/PlayerSearch.jsx";
import { Link } from "react-router-dom";
import DropdownFilter from "./DropdownFilter.jsx";
import ShownColumnFilter from "./ShownColumnFilter.jsx";
import { useLocation } from "react-router-dom";
import { getFlagUrl } from "../utilities/countries.js";

function Header() {
  const location = useLocation();
  // console.log("pathname:", location.pathname, location.pathname === '/');

  return (
    <header className="container">
      <PlayerSearch />
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

        {(location.pathname === "/" ||
          location.pathname.startsWith("/compare")) && <ShownColumnFilter />}
      </div>
    </header>
  );
}

export default Header;
