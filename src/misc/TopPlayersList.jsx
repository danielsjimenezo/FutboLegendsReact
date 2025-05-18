import { useState } from "react"
import { shortenName } from "../utilities/utilities.js";

const formatPlayerNameForImage = (playerName) => {
  // Remove spaces, dashes, apostrophes and special characters
  // return playerName.replace(/[\s'.-]/g, "");
  return playerName;
};



function TopPlayersList({ scorers, assisters }) {

    const [activeTab, setActiveTab] = useState('scorers')

    return (
        <section className="stats-section">
            <div className="tabs">
                <button
                    className={`tab ${activeTab === "scorers" ? "active" : ""}`}
                    onClick={() => setActiveTab("scorers")}
                >
                    Top Scorers
                </button>
                <button
                    className={`tab ${activeTab === "assisters" ? "active" : ""}`}
                    onClick={() => setActiveTab("assisters")}
                >
                    Top Assisters
                </button>
            </div>

            {activeTab === "scorers" && (
                <div className="tab-content">
                    <ol className="player-stats-list">
                        {scorers.map((player, index) => (
                            <li key={index}>
                                <div className="player-info">
                                    <div
                                        className="player-image"
                                        style={{
                                            backgroundImage: `url('/images/Players/${formatPlayerNameForImage(
                                                player.name
                                            )}.jpg')`,
                                        }}
                                        onError={(e) => {
                                            e.target.onerror = null
                                            e.target.style.backgroundColor =
                                                "rgba(255, 255, 255, 0.1)"
                                            e.target.textContent = player.name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")
                                        }}
                                    ></div>
                                    <span className="player-name">
                                        {shortenName(player.name)}
                                    </span>
                                </div>
                                <span className="stat">{player.stat}</span>
                            </li>
                        ))}
                    </ol>
                </div>
            )}

            {/* Top Assisters Tab */}
            {activeTab === "assisters" && (
                <div className="tab-content">
                    <ol className="player-stats-list">
                        {assisters.map((player, index) => (
                            <li key={index}>
                                <div className="player-info">
                                    <div
                                        className="player-image"
                                        style={{
                                            backgroundImage: `url('/images/Players/${formatPlayerNameForImage(
                                                player.name
                                            )}.jpg')`,
                                        }}
                                        onError={(e) => {
                                            e.target.onerror = null
                                            e.target.style.backgroundColor =
                                                "rgba(255, 255, 255, 0.1)"
                                            e.target.textContent = player.name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")
                                        }}
                                    ></div>
                                    <span className="player-name">
                                        {shortenName(player.name)}
                                    </span>
                                </div>
                                <span className="stat">{player.stat}</span>
                            </li>
                        ))}
                    </ol>
                </div>
            )}
        </section>
    )
}

export default TopPlayersList