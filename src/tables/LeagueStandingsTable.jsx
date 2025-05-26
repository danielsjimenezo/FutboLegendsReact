import React from "react";
import Table from "./Table.jsx";
import "./Table.css"; // Import general table styles

// Premier League teams 2023/24 with badge URLs
const premierLeagueTeams = [
  {
    name: "Arsenal",
    badge: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
    played: 38,
    goalDifference: 62,
    goalsFor: 91,
    goalsAgainst: 29,
    points: 89,
    form: ["W", "W", "W", "W", "W"],
  },
  {
    name: "Manchester City",
    badge:
      "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
    played: 38,
    goalDifference: 62,
    goalsFor: 96,
    goalsAgainst: 34,
    points: 91,
    form: ["W", "W", "W", "W", "W"],
  },
  {
    name: "Liverpool",
    badge: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
    played: 38,
    goalDifference: 45,
    goalsFor: 86,
    goalsAgainst: 41,
    points: 82,
    form: ["W", "D", "L", "W", "W"],
  },
  {
    name: "Aston Villa",
    badge:
      "https://upload.wikimedia.org/wikipedia/en/9/9f/Aston_Villa_logo.svg",
    played: 38,
    goalDifference: 15,
    goalsFor: 76,
    goalsAgainst: 61,
    points: 68,
    form: ["L", "W", "D", "L", "W"],
  },
  {
    name: "Tottenham Hotspur",
    badge:
      "https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg",
    played: 38,
    goalDifference: 13,
    goalsFor: 74,
    goalsAgainst: 61,
    points: 66,
    form: ["L", "L", "W", "L", "W"],
  },
  {
    name: "Chelsea",
    badge: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg",
    played: 38,
    goalDifference: 14,
    goalsFor: 77,
    goalsAgainst: 63,
    points: 63,
    form: ["W", "W", "W", "W", "W"],
  },
  {
    name: "Newcastle United",
    badge:
      "https://upload.wikimedia.org/wikipedia/en/5/56/Newcastle_United_Logo.svg",
    played: 38,
    goalDifference: 23,
    goalsFor: 85,
    goalsAgainst: 62,
    points: 60,
    form: ["W", "L", "W", "D", "L"],
  },
  {
    name: "Manchester United",
    badge:
      "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg",
    played: 38,
    goalDifference: -1,
    goalsFor: 57,
    goalsAgainst: 58,
    points: 60,
    form: ["W", "W", "L", "L", "W"],
  },
  {
    name: "West Ham United",
    badge:
      "https://upload.wikimedia.org/wikipedia/en/c/c2/West_Ham_United_FC_logo.svg",
    played: 38,
    goalDifference: -14,
    goalsFor: 60,
    goalsAgainst: 74,
    points: 52,
    form: ["L", "D", "L", "W", "L"],
  },
  {
    name: "Crystal Palace",
    badge:
      "https://upload.wikimedia.org/wikipedia/en/0/0c/Crystal_Palace_FC_logo.svg",
    played: 38,
    goalDifference: -1,
    goalsFor: 57,
    goalsAgainst: 58,
    points: 49,
    form: ["W", "W", "W", "D", "W"],
  },
  {
    name: "Brighton & Hove Albion",
    badge:
      "https://upload.wikimedia.org/wikipedia/en/f/fd/Brighton_%26_Hove_Albion_logo.svg",
    played: 38,
    goalDifference: -7,
    goalsFor: 55,
    goalsAgainst: 62,
    points: 48,
    form: ["L", "D", "L", "W", "L"],
  },
  {
    name: "Bournemouth",
    badge:
      "https://upload.wikimedia.org/wikipedia/en/e/e5/AFC_Bournemouth_%282013%29.svg",
    played: 38,
    goalDifference: -13,
    goalsFor: 54,
    goalsAgainst: 67,
    points: 48,
    form: ["L", "W", "L", "D", "L"],
  },
  {
    name: "Fulham",
    badge:
      "https://upload.wikimedia.org/wikipedia/en/e/eb/Fulham_FC_%28shield%29.svg",
    played: 38,
    goalDifference: -8,
    goalsFor: 55,
    goalsAgainst: 63,
    points: 47,
    form: ["W", "L", "D", "W", "L"],
  },
  {
    name: "Wolverhampton Wanderers",
    badge:
      "https://upload.wikimedia.org/wikipedia/en/f/fc/Wolverhampton_Wanderers.svg",
    played: 38,
    goalDifference: -15,
    goalsFor: 50,
    goalsAgainst: 65,
    points: 46,
    form: ["L", "L", "W", "L", "D"],
  },
  {
    name: "Everton",
    badge: "https://upload.wikimedia.org/wikipedia/en/7/7c/Everton_FC_logo.svg",
    played: 38,
    goalDifference: -11,
    goalsFor: 40,
    goalsAgainst: 51,
    points: 40,
    form: ["W", "W", "D", "L", "W"],
  },
  {
    name: "Brentford",
    badge:
      "https://upload.wikimedia.org/wikipedia/en/2/2a/Brentford_FC_crest.svg",
    played: 38,
    goalDifference: -9,
    goalsFor: 56,
    goalsAgainst: 65,
    points: 39,
    form: ["L", "W", "L", "D", "L"],
  },
  {
    name: "Nottingham Forest",
    badge:
      "https://upload.wikimedia.org/wikipedia/en/1/1e/Nottingham_Forest_FC_logo.svg",
    played: 38,
    goalDifference: -18,
    goalsFor: 49,
    goalsAgainst: 67,
    points: 32,
    form: ["W", "L", "D", "L", "W"],
  },
  {
    name: "Luton Town",
    badge:
      "https://upload.wikimedia.org/wikipedia/en/6/6e/Luton_Town_FC_logo.svg",
    played: 38,
    goalDifference: -33,
    goalsFor: 52,
    goalsAgainst: 85,
    points: 26,
    form: ["L", "L", "L", "L", "L"],
  },
  {
    name: "Burnley",
    badge: "https://upload.wikimedia.org/wikipedia/en/6/62/FC_Burnley.svg",
    played: 38,
    goalDifference: -37,
    goalsFor: 41,
    goalsAgainst: 78,
    points: 24,
    form: ["L", "L", "D", "L", "L"],
  },
  {
    name: "Sheffield United",
    badge:
      "https://upload.wikimedia.org/wikipedia/en/3/3e/Sheffield_United_FC_logo.svg",
    played: 38,
    goalDifference: -69,
    goalsFor: 35,
    goalsAgainst: 104,
    points: 16,
    form: ["L", "L", "L", "L", "L"],
  },
];

function LeagueStandingsTable() {
  const headings = ["Rank", "Team", "Pts.", "G", "W", "L", "D", "Gls.", "GD"];

  const items = premierLeagueTeams.map((team, index) => ({
    "#": index + 1,
    Team: {
      type: "team",
      name: team.name,
      badge: team.badge,
    },
    "Pts.": team.points,
    G: team.played,
    W: Math.floor(team.points / 3), // Assuming 3 points per win
    L: Math.floor((team.played - team.points / 3) / 2), // Rough estimate of losses
    D:
      team.played -
      Math.floor(team.points / 3) -
      Math.floor((team.played - team.points / 3) / 2), // Remaining games as draws
    "Gls.": team.goalsFor,
    GD: team.goalDifference,
  }));

  const columnWidths = [
    "5%", // Rank
    "10%", // Team
    "7%", // Pts.
    "7%", // G
    "7%", // W
    "7%", // L
    "7%", // D
    "7%", // Gls.
    "7%", // GD
  ];

  return (
    <div className="league-standings-table">
      {/* <h2>League Standings</h2> */}
      <Table
        headings={headings}
        items={items}
        _key="#"
        columnWidths={columnWidths}
      />
    </div>
  );
}

export default LeagueStandingsTable;
