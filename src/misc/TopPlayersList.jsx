import { useState } from "react";
import { shortenName } from "../utilities/utilities.js";

const formatPlayerNameForImage = (playerName) => {
  // Remove spaces, dashes, apostrophes and special characters
  // return playerName.replace(/[\s'.-]/g, "");
  return playerName;
};

function TopPlayersList({ data1, data2, label1, label2, imageFolder }) {
  const [activeTab, setActiveTab] = useState("tab1");

  const currentData = activeTab === "tab1" ? data1 : data2;


  return (
    <section className="stats-section">
      <div className="tabs">
        <button
          className={`tab ${activeTab === "tab1" ? "active" : ""}`}
          onClick={() => setActiveTab("tab1")}
        >
          {label1}
        </button>
        <button
          className={`tab ${activeTab === "tab2" ? "active" : ""}`}
          onClick={() => setActiveTab("tab2")}
        >
          {label2}
        </button>
      </div>

      <div className="tab-content">
        <ol className="player-stats-list">
          {currentData.map((player, index) => (
            <li key={index}>
              <div className="player-info">
                <div
                  className="player-image"
                  style={{
                    backgroundImage: `url('/images/${imageFolder}/${formatPlayerNameForImage(
                      player.player.name
                    )}.jpg')`,
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                    e.target.textContent = player.player.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("");
                  }}
                ></div>
                <span className="player-name">{shortenName(player.player.name)}</span>
              </div>
              <span className="stat">{activeTab === "tab1" ? player.statistics[0]?.goals?.total : player.statistics[0]?.goals.assists}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default TopPlayersList;
