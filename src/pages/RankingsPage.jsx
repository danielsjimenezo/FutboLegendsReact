import { useState, useRef, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "./RankingsPage.css";
import { selectPlayerState } from "../context/playerSlice.js";
import { useSelector } from "react-redux";
import { shortenName } from "../utilities/utilities.js";

// Sortable Item Component
function SortableItem({ id, index, name }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = transform
    ? {
        transform: CSS.Transform.toString(transform),
        transition,
      }
    : {};

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`ranking-item ${isDragging ? "dragging" : ""}`}
      {...attributes}
      {...listeners}
    >
      <span className="ranking-number">{index + 1}</span>
      <div className="ranking-photo">
        <img src={`/images/Players/${name}.jpg`} alt={""} />
      </div>
      <span className="player-name">{shortenName(name)}</span>
      <span className="drag-indicator">⋮⋮</span>
    </div>
  );
}

function RankingsPage() {
  // All available players database (expanded for search)
  const allPlayers = [
    { id: "p1", Player: "Lionel Messi" },
    { id: "p2", Player: "Cristiano Ronaldo" },
    { id: "p3", Player: "Kylian Mbappé" },
    { id: "p4", Player: "Erling Haaland" },
    { id: "p5", Player: "Kevin De Bruyne" },
    { id: "p6", Player: "Mohamed Salah" },
    { id: "p7", Player: "Robert Lewandowski" },
    { id: "p8", Player: "Neymar Jr" },
    { id: "p9", Player: "Virgil van Dijk" },
    { id: "p10", Player: "Luka Modric" },
    { id: "p11", Player: "Harry Kane" },
    { id: "p12", Player: "Thibaut Courtois" },
    { id: "p13", Player: "Joshua Kimmich" },
    { id: "p14", Player: "Karim Benzema" },
    { id: "p15", Player: "Rodri" },
    { id: "p16", Player: "Trent Alexander-Arnold" },
    { id: "p17", Player: "Vinicius Jr" },
    { id: "p18", Player: "Phil Foden" },
    { id: "p19", Player: "Jude Bellingham" },
    { id: "p20", Player: "N'Golo Kanté" },
    { id: "p21", Player: "Federico Valverde" },
    { id: "p22", Player: "Jamal Musiala" },
    { id: "p23", Player: "Bukayo Saka" },
    { id: "p24", Player: "Bruno Fernandes" },
    { id: "p25", Player: "Bernardo Silva" },
    { id: "p26", Player: "Rúben Dias" },
    { id: "p27", Player: "João Cancelo" },
    { id: "p28", Player: "Pedri" },
    { id: "p29", Player: "Gavi" },
    { id: "p30", Player: "Alisson Becker" },
  ];

  const { players } = useSelector(selectPlayerState);
  // Sample player data for official rankings
  const officialDefaultPlayers = allPlayers.slice(0, 20);

  // Initialize MY RANKINGS states
  const [myTopPlayers, setMyTopPlayers] = useState([...officialDefaultPlayers]);
  const [mySearchTerm, setMySearchTerm] = useState("");
  const [mySearchResults, setMySearchResults] = useState([]);
  const [myReplaceIndex, setMyReplaceIndex] = useState(0);
  const [showMyResults, setShowMyResults] = useState(false);

  // Initialize OFFICIAL RANKINGS states (completely separate)
  const [officialTopPlayers, setOfficialTopPlayers] = useState([
    ...officialDefaultPlayers,
  ]);
  const [officialSearchTerm, setOfficialSearchTerm] = useState("");
  const [officialSearchResults, setOfficialSearchResults] = useState([]);
  const [officialReplaceIndex, setOfficialReplaceIndex] = useState(0);
  const [showOfficialResults, setShowOfficialResults] = useState(false);

  // Separate refs for each section
  const myResultsRef = useRef(null);
  const officialResultsRef = useRef(null);

  // Set up sensors for drag detection - separate for each section
  const myDragSensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const officialDragSensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // MY RANKINGS search functionality
  const handleMySearch = (e) => {
    const term = e.target.value;
    setMySearchTerm(term);

    if (term.length >= 2) {
      const results = players.filter((player) =>
        player.Player.toLowerCase().includes(term.toLowerCase())
      );
      setMySearchResults(results);
      setShowMyResults(true);
    } else {
      setMySearchResults([]);
      setShowMyResults(false);
    }
  };

  // OFFICIAL RANKINGS search functionality
  const handleOfficialSearch = (e) => {
    const term = e.target.value;
    setOfficialSearchTerm(term);

    if (term.length >= 2) {
      const results = players.filter((player) =>
        player.Player.toLowerCase().includes(term.toLowerCase())
      );
      setOfficialSearchResults(results);
      setShowOfficialResults(true);
    } else {
      setOfficialSearchResults([]);
      setShowOfficialResults(false);
    }
  };

  // Handle selection from MY search results
  const handleSelectMyPlayer = (player) => {
    // Replace player at current index
    const newPlayers = [...myTopPlayers];

    // Check if already exists, and if it does, move instead
    console.log({ newPlayers, player });
    const existingIndex = newPlayers.findIndex(
      (p) => p.Player === player.Player
    );
    if (existingIndex !== -1) {
      // Move player
      newPlayers.splice(existingIndex, 1);
      newPlayers.splice(myReplaceIndex, 0, player);
      setMyTopPlayers(newPlayers);
    } else {
      // Add player
      newPlayers[myReplaceIndex] = player;
      setMyTopPlayers(newPlayers);
    }

    setMySearchTerm("");
    setMySearchResults([]);
    setShowMyResults(false);

    // Increment index for next selection, cycle back to 0 if at end
    setMyReplaceIndex((prevIndex) => (prevIndex + 1) % 20);
  };

  // Handle selection from OFFICIAL search results
  const handleSelectOfficialPlayer = (player) => {
    // Replace player at current index
    const newPlayers = [...officialTopPlayers];
    // Check if already exists, and if it does, move instead
    const existingIndex = newPlayers.findIndex(
      (p) => p.Player === player.Player
    );
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

  // Handle drag end for MY RANKINGS
  const handleMyDragEnd = (event) => {
    const { active, over } = event;

    if (active && over && active.id !== over.id) {
      setMyTopPlayers((items) => {
        const oldIndex = items.findIndex((item) => item.Player === active.id);
        const newIndex = items.findIndex((item) => item.Player === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  // Handle drag end for OFFICIAL RANKINGS
  const handleOfficialDragEnd = (event) => {
    const { active, over } = event;

    if (active && over && active.id !== over.id) {
      setOfficialTopPlayers((items) => {
        const oldIndex = items.findIndex((item) => item.Player === active.id);
        const newIndex = items.findIndex((item) => item.Player === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        myResultsRef.current &&
        !myResultsRef.current.contains(event.target)
      ) {
        setShowMyResults(false);
      }

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
    <div className="rankings-page container">
      {/* Left Section - My Rankings */}
      <section className="rankings-section editable-rankings">
        <div className="section-header">
          <h2>My Top 20</h2>
          <div className="search-container" ref={myResultsRef}>
            <input
              type="text"
              placeholder={`Search to replace #${myReplaceIndex + 1}...`}
              value={mySearchTerm}
              onChange={handleMySearch}
              className="search-input"
            />
            {showMyResults && mySearchResults.length > 0 && (
              <ul className="search-results">
                {mySearchResults.map((player) => (
                  <li
                    key={player.Player}
                    onClick={() => handleSelectMyPlayer(player)}
                  >
                    {player.Player}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <DndContext
          sensors={myDragSensors}
          collisionDetection={closestCenter}
          onDragEnd={handleMyDragEnd}
        >
          <SortableContext
            items={myTopPlayers.map((player) => player.Player)}
            strategy={verticalListSortingStrategy}
          >
            <div className="rankings-list">
              {myTopPlayers.map((player, index) => (
                <SortableItem
                  key={player.Player}
                  id={player.Player}
                  index={index}
                  name={player.Player}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </section>

      {/* Right Section - Official Rankings */}
      <section className="rankings-section official-rankings">
        <div className="section-header">
          <h2>Official Top 20</h2>
          <div className="search-container" ref={officialResultsRef}>
            {/* <input
              type="text"
              placeholder={`Search to replace #${officialReplaceIndex + 1}...`}
              value={officialSearchTerm}
              onChange={handleOfficialSearch}
              className="search-input"
            /> */}
            {showOfficialResults && officialSearchResults.length > 0 && (
              <ul className="search-results">
                {officialSearchResults.map((player) => (
                  <li
                    key={player.Player}
                    onClick={() => handleSelectOfficialPlayer(player)}
                  >
                    {player.Player}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* <DndContext
          sensors={officialDragSensors}
          collisionDetection={closestCenter}
          onDragEnd={handleOfficialDragEnd}
        >
          <SortableContext
            items={officialTopPlayers.map((player) => player.Player)}
            strategy={verticalListSortingStrategy}
          >
            <div className="rankings-list">
              {officialTopPlayers.map((player, index) => (
                <SortableItem
                  key={player.Player}
                  id={player.Player}
                  index={index}
                  name={player.Player}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext> */}
        <div className="rankings-list">
          {officialTopPlayers.map((player, index) => (
            <div style={{}} className={`ranking-item`} key={player.Player}>
              <span className="ranking-number">{index + 1}</span>
              <div className="ranking-photo">
                <img src={`/images/Players/${player.Player}.jpg`} alt={""} />
              </div>
              <span className="player-name">{shortenName(player.Player)}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default RankingsPage;
