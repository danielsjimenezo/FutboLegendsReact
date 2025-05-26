const positionMap = {
    "Center Attacking Mid": "CAM",
    "Center Defensive Mid": "CDM",
    "Center Mid": "CM",
    "Center Back": "CB",
    "Forward": "FWD",
    "Goalkeeper": "GK",
    "Left Back": "LB",
    "Right Back": "RB",
    "Striker": "STR",
    "Winger": "WGR"
}

const positionLongMap = {
    CAM: "Center Attacking Mid",
    CDM: "Center Defensive Mid",
    CM: "Center Mid",
    CB: "Center Back",
    FWD: "Forward",
    GK: "Goalkeeper",
    LB: "Left Back",
    RB: "Right Back",
    STR: "Striker",
    WGR: "Winger"
}

export default function processPosition(player) {
    player.positionLong = positionLongMap[player.position]
}