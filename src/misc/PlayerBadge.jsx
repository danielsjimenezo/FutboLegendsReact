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
            <div className="statsBadgeCircleBig1" style={{
                backgroundImage: `linear-gradient(${deg}deg, ${colors.join(', ')})`
            }}>
                <div className="statsBadgeCircleSmall">
                    <div className="statsBadgeValue">{value}</div>
                </div>
                <div className="badgeRank">
                    <span>{rank}</span>
                    <img src={`/images/Icons/${icon}.png`} alt={icon} />
                </div>
            </div>
        </div>
    )
}

export default PlayerBadge