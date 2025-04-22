import "./Header.css";
import PlayerSearch from "../misc/PlayerSearch.jsx";
import { Link } from "react-router-dom";
import DropdownFilter from "./DropdownFilter.jsx";

function Header() {

  return (
    <header>
      <PlayerSearch />
      <div id="nav">
        <Link to="/">
          <button className="topButtons" id="recordButtonn">
            Record Book
          </button>
        </Link>
        <Link to="/compare">
          <button className="topButtons" id="compareButtonn">
            Compare Players
          </button>
        </Link>
      </div>

      <div id="filters">

        <DropdownFilter
          icon="global_icon"
          filterKey="countries"
        />

        <DropdownFilter
          icon="Funnel"
          filterKey="positions"        
        />

      </div>
    </header>
  );
}

export default Header;
