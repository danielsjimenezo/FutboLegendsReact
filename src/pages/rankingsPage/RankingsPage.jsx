import { useState, useRef, useEffect } from "react";
import {
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "./RankingsPage.css";
import { selectPlayerState } from "../../context/playerSlice.js";
import { useSelector } from "react-redux";
import { shortenName } from "../../utilities/utilities.js";
import MyTop20 from "./MyTop20.jsx";

function RankingsPage() {
  // All available players database (expanded for search)
  const allPlayers = [
    { id: "p1", name: "Lionel Messi" },
    { id: "p2", name: "Cristiano Ronaldo" },
    { id: "p3", name: "Kylian Mbappé" },
    { id: "p4", name: "Erling Haaland" },
    { id: "p5", name: "Kevin De Bruyne" },
    { id: "p6", name: "Mohamed Salah" },
    { id: "p7", name: "Robert Lewandowski" },
    { id: "p8", name: "Neymar Jr" },
    { id: "p9", name: "Virgil van Dijk" },
    { id: "p10", name: "Luka Modric" },
    { id: "p11", name: "Harry Kane" },
    { id: "p12", name: "Thibaut Courtois" },
    { id: "p13", name: "Joshua Kimmich" },
    { id: "p14", name: "Karim Benzema" },
    { id: "p15", name: "Rodri" },
    { id: "p16", name: "Trent Alexander-Arnold" },
    { id: "p17", name: "Vinicius Jr" },
    { id: "p18", name: "Phil Foden" },
    { id: "p19", name: "Jude Bellingham" },
    { id: "p20", name: "N'Golo Kanté" },
    { id: "p21", name: "Federico Valverde" },
    { id: "p22", name: "Jamal Musiala" },
    { id: "p23", name: "Bukayo Saka" },
    { id: "p24", name: "Bruno Fernandes" },
    { id: "p25", name: "Bernardo Silva" },
    { id: "p26", name: "Rúben Dias" },
    { id: "p27", name: "João Cancelo" },
    { id: "p28", name: "Pedri" },
    { id: "p29", name: "Gavi" },
    { id: "p30", name: "Alisson Becker" },
  ];

  const { players } = useSelector(selectPlayerState);
  // Sample player data for official rankings
  const officialDefaultPlayers = allPlayers.slice(0, 20);

  // Initialize OFFICIAL RANKINGS states (completely separate)
  const [officialTopPlayers, setOfficialTopPlayers] = useState([
    ...officialDefaultPlayers,
  ]);

  const [officialSearchResults, setOfficialSearchResults] = useState([]);
  const [officialReplaceIndex, setOfficialReplaceIndex] = useState(0);
  const [showOfficialResults, setShowOfficialResults] = useState(false);

  // Separate refs for each section
  const officialResultsRef = useRef(null);

  // Handle selection from OFFICIAL search results
  const handleSelectOfficialPlayer = (player) => {
    // Replace player at current index
    const newPlayers = [...officialTopPlayers];
    // Check if already exists, and if it does, move instead
    const existingIndex = newPlayers.findIndex((p) => p.name === player.name);
    if (existingIndex !== -1) {
      // Move player
      newPlayers.splice(existingIndex, 1);
      newPlayers.splice(officialReplaceIndex, 0, player);
      setOfficialTopPlayers(newPlayers);
    } else {
      // Add player
      newPlayers[officialReplaceIndex] = player;
      setOfficialTopPlayers(newPlayers);
    }

    setOfficialTopPlayers(newPlayers);
    setOfficialSearchTerm("");
    setOfficialSearchResults([]);
    setShowOfficialResults(false);

    // Increment index for next selection, cycle back to 0 if at end
    setOfficialReplaceIndex((prevIndex) => (prevIndex + 1) % 20);
  };

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        officialResultsRef.current &&
        !officialResultsRef.current.contains(event.target)
      ) {
        setShowOfficialResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    // if authenticated, return
    <div className="rankings-page container">
      {/* Left Section - My Rankings */}
      <MyTop20 />

      {/* Middle line */}
      <div className="line"></div>

      {/* Right Section - Official Rankings */}
      <section className="rankings-section official-rankings">
        <div className="section-header">
          <h2>Community Top 20</h2>
          <div className="search-container" ref={officialResultsRef}>
            {showOfficialResults && officialSearchResults.length > 0 && (
              <ul className="search-results">
                {officialSearchResults.map((player) => (
                  <li
                    key={player.name}
                    onClick={() => handleSelectOfficialPlayer(player)}
                  >
                    {player.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="rankings-list">
          {officialTopPlayers.map((player, index) => (
            <div style={{}} className={`ranking-item`} key={player.name}>
              <span className="ranking-number">{index + 1}</span>
              <div className="ranking-photo">
                <img src={`/images/Players/${player.name}.jpg`} alt={""} />
              </div>
              <span className="player-name">{shortenName(player.name)}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default RankingsPage;
