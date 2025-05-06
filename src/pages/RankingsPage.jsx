import { useState } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./RankingsPage.css";

function RankingsPage() {
  // Sample player data
  const officialTopPlayers = [
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
  ];

  // Initialize state with players
  const [myTopPlayers, setMyTopPlayers] = useState([...officialTopPlayers]);

  // Handle drag end
  const onDragEnd = (result) => {
    // Dropped outside the list
    if (!result.destination) {
      return;
    }

    // Reorder the list
    const items = Array.from(myTopPlayers);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setMyTopPlayers(items);
  };

  return (
    <div className="rankings-page">
      {/* Left Section - Editable Rankings */}
      <section className="rankings-section editable-rankings">
        <h2>My Top 20</h2>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="myRankings">
            {(provided) => (
              <div
                className="rankings-list"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {myTopPlayers.map((player, index) => (
                  <Draggable
                    key={player.id}
                    draggableId={player.id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        className={`ranking-item ${
                          snapshot.isDragging ? "dragging" : ""
                        }`}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <span className="ranking-number">{index + 1}</span>
                        <span className="player-name">{player.name}</span>
                        <span className="drag-indicator">⋮⋮</span>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </section>

      {/* Right Section - Official Rankings */}
      <section className="rankings-section official-rankings">
        <h2>Official Top 20</h2>
        <div className="rankings-list">
          {officialTopPlayers.map((player, index) => (
            <div key={player.id} className="ranking-item">
              <span className="ranking-number">{index + 1}</span>
              <span className="player-name">{player.name}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default RankingsPage;
