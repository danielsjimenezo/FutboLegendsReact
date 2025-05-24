import { useState } from "react"

// Example of a match card component for reusability
const MatchCard = ({
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
    competition,
    date,
    goals, // New array of goal information
}) => {
    // Helper function to format team name for image filename
    const formatTeamNameForImage = (teamName) => {
        // Remove spaces and special characters
        return teamName.replace(/\s+/g, "")
    }

    const homeImagePath = `/images/Teams/${formatTeamNameForImage(
        homeTeam
    )}.png`
    const awayImagePath = `/images/Teams/${formatTeamNameForImage(
        awayTeam
    )}.png`

    // State to track if images loaded successfully
    const [homeImageError, setHomeImageError] = useState(false)
    const [awayImageError, setAwayImageError] = useState(false)

    return (
        <div className="timeline-item">
            <div className="timeline-date">{date}</div>
            <div className="match-card">
                <div className="teams">
                    <span className="team">
                        {!homeImageError ? (
                            <div
                                className="team-badge"
                                style={{ backgroundImage: `url('${homeImagePath}')` }}
                                onError={() => setHomeImageError(true)}
                            ></div>
                        ) : (
                            <div className="team-badge team-badge-fallback">
                                {homeTeam.charAt(0)}
                            </div>
                        )}
                        <span>{homeTeam}</span>
                    </span>
                    <span
                        className={`score ${parseInt(homeScore) > parseInt(awayScore)
                            ? "score-home-win"
                            : parseInt(homeScore) < parseInt(awayScore)
                                ? "score-away-win"
                                : "score-tie"
                            }`}
                    >
                        {homeScore} - {awayScore}
                    </span>
                    <span className="team">
                        <span>{awayTeam}</span>
                        {!awayImageError ? (
                            <div
                                className="team-badge"
                                style={{ backgroundImage: `url('${awayImagePath}')` }}
                                onError={() => setAwayImageError(true)}
                            ></div>
                        ) : (
                            <div className="team-badge team-badge-fallback">
                                {awayTeam.charAt(0)}
                            </div>
                        )}
                    </span>
                </div>

                {/* New goals section */}
                {goals && goals.length > 0 && (
                    <div className="goals-section">
                        {goals.map((goal, index) => (
                            <div
                                key={index}
                                className={`goal-item ${goal.team === homeTeam ? "home-goal" : "away-goal"
                                    }`}
                            >
                                {goal.team === homeTeam ? (
                                    // Home team goals (left-aligned)
                                    <>
                                        <span className="goal-minute">{goal.minute}'</span>
                                        <div
                                            className="goal-scorer-image"
                                            style={{
                                                backgroundImage: `url('/images/Players/${goal.scorer}.jpg')`,
                                            }}
                                            onError={(e) => {
                                                e.target.onerror = null
                                                e.target.style.backgroundColor =
                                                    "rgba(255, 255, 255, 0.1)"
                                                e.target.textContent = goal.scorer.charAt(0)
                                            }}
                                        ></div>
                                        <span className="goal-scorer">{goal.scorer}</span>
                                        {goal.penalty && <span className="goal-type">(P)</span>}
                                        {goal.ownGoal && <span className="goal-type">(OG)</span>}
                                    </>
                                ) : (
                                    // Away team goals (right-aligned)
                                    <>
                                        {goal.penalty && <span className="goal-type">(P)</span>}
                                        {goal.ownGoal && <span className="goal-type">(OG)</span>}
                                        <span className="goal-scorer">{goal.scorer}</span>
                                        <div
                                            className="goal-scorer-image"
                                            style={{
                                                backgroundImage: `url('/images/Players/${goal.scorer}.jpg')`,
                                            }}
                                            onError={(e) => {
                                                e.target.onerror = null
                                                e.target.style.backgroundColor =
                                                    "rgba(255, 255, 255, 0.1)"
                                                e.target.textContent = goal.scorer.charAt(0)
                                            }}
                                        ></div>
                                        <span className="goal-minute">{goal.minute}'</span>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                <div className="competition">{competition}</div>
            </div>
        </div>
    )
}

export default MatchCard