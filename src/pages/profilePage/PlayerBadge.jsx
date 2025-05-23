function PlayerBadge({
    title = 'Unknown stat',
    value = 0,
    colors = ['#af95fc', '#685996'], 
    deg = 135,
    rank = "N/A",
    icon = "Prize"
}) {
    return (
        <div className="statsBadgeContainer">
            <div className="statsBadgeTitle">{title}</div>
            <div className="statsBadgeCircle" style={{
                backgroundImage: `linear-gradient(${deg}deg, ${colors.join(', ')})`
            }}>
                <div className="statsBadgeCircleSmall">
                    <div className="statsBadgeValue">{value.toLocaleString()}</div>
                </div>
                <div className="badgeRank">
                    <span>{rank.toLocaleString()}</span>
                    <img src={`/images/Icons/${icon}.png`} alt={icon} />
                </div>
            </div>
        </div>
    )
}

export default PlayerBadge