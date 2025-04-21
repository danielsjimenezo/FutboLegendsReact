import "./Header.css";
import PlayerSearch from "../misc/PlayerSearch.jsx";
import { Link } from "react-router-dom";
import DropdownFilter from "./DropdownFilter.jsx";

function Header() {

  return (
    <header>
      <PlayerSearch />
      <div id="nav">
        <button className="topButtons" id="recordButtonn">
          <Link to="/">Record Book</Link>
        </button>
        <button className="topButtons" id="compareButtonn">
          <Link to="/compare">Compare Players</Link>
        </button>
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
