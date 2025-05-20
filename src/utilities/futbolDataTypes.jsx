// @ts-check

import { graphColors } from "./utilities.js";

/**
 * @typedef {Record<string, any>} Player
 * @typedef {["transparent", string, number?, number?, number?, number?]} Gradient
 */

/**
 * @typedef ChartConfig
 * @property {string} label
 * @property {Gradient} [gradient]
 * @property {(p: Player) => number} getPlayerValue
 */

/**
 * @typedef FutbolDataType
 * @property {string} id A unique identifier for the data type. Does not appear in the UI.
 * @property {string} labelLong appears in UI
 * @property {string} label appears in UI
 * @property {string} labelShort appears in UI
 * @property {(p1: Player, p2: Player) => number} sortAlg
 * @property {(p: Player) => number} getPlayerValue
 * @property {(p: Player) => number} getPlayerRank
 * @property {(p: Player) => number} getPlayerRankNative
 * @property {Gradient} [gradient] OPTIONAL
 * @property {ChartConfig[]} [multiData] OPTIONAL
 * @property {number} [dataCeiling]
 */

/** @type {FutbolDataType[]} */
export const futbolDataTypes = [
  {
    id: "games",
    labelLong: "Games",
    label: "Games",
    labelShort: "Games",
    dataCeiling: 1400,
    sortAlg: (p1, p2) => {
      return p2.GamesPlayed - p1.GamesPlayed;
    },
    getPlayerValue: (p) => {
      return p.GamesPlayed;
    },
    getPlayerRank: (p) => {
      return p.gamesPlayedRank;
    },
    getPlayerRankNative: (p) => {
      return p.gamesPlayedRankNative;
    },
    gradient: ["transparent", graphColors.pink],
  },
  {
    id: "goals",
    labelLong: "Goals",
    label: "Goals",
    labelShort: "Goals",
    dataCeiling: 1400,
    sortAlg: (p1, p2) => {
      return p2.Goals - p1.Goals;
    },
    getPlayerValue: (p) => {
      return p.Goals;
    },
    getPlayerRank: (p) => {
      return p.goalsRank;
    },
    getPlayerRankNative: (p) => {
      return p.goalsRankNative;
    },
  },
  {
    id: "assists",
    labelLong: "Assists",
    label: "Assists",
    labelShort: "Assists",
    dataCeiling: 1400,
    sortAlg: (p1, p2) => {
      return p2.Assists - p1.Assists;
    },
    getPlayerValue: (p) => {
      return p.Assists;
    },
    getPlayerRank: (p) => {
      return p.assistsRank;
    },
    getPlayerRankNative: (p) => {
      return p.assistsRankNative;
    },
    gradient: ["transparent", graphColors.green],
  },
  {
    id: "contributions",
    labelLong: " Goal Contributions",
    label: "Goals Contributions",
    labelShort: "GC",
    dataCeiling: 1400,
    sortAlg: (p1, p2) => {
      return p2.GoalContributions - p1.GoalContributions;
    },
    getPlayerValue: (p) => {
      return p.GoalContributions;
    },
    getPlayerRank: (p) => {
      return p.contributionsRank;
    },
    getPlayerRankNative: (p) => {
      return p.contributionsRankNative;
    },
    multiData: [
      {
        label: "Goals",
        gradient: ["transparent", graphColors.pink],
        getPlayerValue: (p) => p.Goals,
      },
      {
        label: "Assists",
        gradient: ["transparent", "#AF95FC", 200, 0, 300, 0],
        getPlayerValue: (p) => p.Assists,
      },
    ],
  },
  {
    id: "efficiency",
    labelLong: "Goal Efficiency",
    label: "Goal Efficiency",
    labelShort: "GE",
    dataCeiling: 3,
    sortAlg: (p1, p2) => {
      return p2.Efficiency - p1.Efficiency;
    },
    getPlayerValue: (p) => {
      return p.Efficiency;
    },
    getPlayerRank: (p) => {
      return p.contributionsPerGameRank;
    },
    getPlayerRankNative: (p) => {
      return p.contributionsPerGameRankNative;
    },
  },
  {
    id: "balon1",
    labelLong: "Balón d'or (1st)",
    label: "Balón (1st)",
    labelShort: "Balón (1st)",
    dataCeiling: 10,
    sortAlg: (p1, p2) => {
      return p2["Balon (1st)"] - p1["Balon (1st)"];
    },
    getPlayerValue: (p) => {
      return p["Balon (1st)"];
    },
    getPlayerRank: (p) => {
      return p.balon1Rank;
    },
    getPlayerRankNative: (p) => {
      return p.balon1RankNative;
    },
    gradient: ["transparent", graphColors.pink],
  },
  {
    id: "balon2",
    labelLong: "Balón d'or (2nd)",
    label: "Balón (2nd)",
    labelShort: "Balón (2nd)",
    dataCeiling: 10,
    sortAlg: (p1, p2) => {
      return p2["Balon (2nd)"] - p1["Balon (2nd)"];
    },
    getPlayerValue: (p) => {
      return p["Balon (2nd)"];
    },
    getPlayerRank: (p) => {
      return p.balon2Rank;
    },
    getPlayerRankNative: (p) => {
      return p.balon2RankNative;
    },
    gradient: ["transparent", "#AF95FC"],
  },
  {
    id: "balon3",
    labelLong: "Balón d'or (3rd",
    label: "Balón (3rd)",
    labelShort: "Balón (3rd)",
    dataCeiling: 10,
    sortAlg: (p1, p2) => {
      return p2["Balon (3rd)"] - p1["Balon (3rd)"];
    },
    getPlayerValue: (p) => {
      return p["Balon (3rd)"];
    },
    getPlayerRank: (p) => {
      return p.balon3Rank;
    },
    getPlayerRankNative: (p) => {
      return p.balon3RankNative;
    },
    gradient: ["transparent", graphColors.green],
  },
  {
    id: "WC Goals",
    labelLong: "World Cup Goals",
    label: "WC Goals",
    labelShort: "WC Goals",
    dataCeiling: 20,
    sortAlg: (p1, p2) => {
      return p2["WC Goals"] - p1["WC Goals"];
    },
    getPlayerValue: (p) => {
      return p["WC Goals"];
    },
    getPlayerRank: (p) => {
      return 0;
    },
    getPlayerRankNative: (p) => {
      return 0;
    },
    gradient: ["transparent", graphColors.pink],
  },
  {
    id: "WC Assists",
    labelLong: "World Cup Assists",
    label: "WC Assists",
    labelShort: "WC Assists",
    dataCeiling: 15,
    sortAlg: (p1, p2) => {
      return p2["WC Assists"] - p1["WC Assists"];
    },
    getPlayerValue: (p) => {
      return p["WC Assists"];
    },
    getPlayerRank: (p) => {
      return 0;
    },
    getPlayerRankNative: (p) => {
      return 0;
    },
    gradient: ["transparent", "#AF95FC"],
  },
  {
    id: "WC FGoals",
    labelLong: "World Cup Finals Goals",
    label: "WC Finals Goals",
    labelShort: "WC FGoals",
    sortAlg: (p1, p2) => {
      return p2["WC FGoals"] - p1["WC FGoals"];
    },
    getPlayerValue: (p) => {
      return p["WC FGoals"];
    },
    getPlayerRank: (p) => {
      return 0;
    },
    getPlayerRankNative: (p) => {
      return 0;
    },
    gradient: ["transparent", graphColors.green],
  },
  {
    id: "WC GBall",
    labelLong: "World Cup Golden Ball",
    label: "WC Golden Ball",
    labelShort: "WC GBall",
    sortAlg: (p1, p2) => {
      return p2["WC GBall"] - p1["WC GBall"];
    },
    getPlayerValue: (p) => {
      return p["WC GBall"];
    },
    getPlayerRank: (p) => {
      return 0;
    },
    getPlayerRankNative: (p) => {
      return 0;
    },
    gradient: ["transparent", graphColors.pink],
  },
  {
    id: "WC SBall",
    labelLong: "World Cup Silver Ball",
    label: "WC Silver Ball",
    labelShort: "WC SBall",
    sortAlg: (p1, p2) => {
      return p2["WC SBall"] - p1["WC SBall"];
    },
    getPlayerValue: (p) => {
      return p["WC SBall"];
    },
    getPlayerRank: (p) => {
      return 0;
    },
    getPlayerRankNative: (p) => {
      return 0;
    },
    gradient: ["transparent", "#AF95FC"],
  },
  {
    id: "WC BBall",
    labelLong: "World Cup Bronze Ball",
    label: "WC Bronze Ball",
    labelShort: "WC BBall",
    sortAlg: (p1, p2) => {
      return p2["WC BBall"] - p1["WC BBall"];
    },
    getPlayerValue: (p) => {
      return p["WC BBall"];
    },
    getPlayerRank: (p) => {
      return 0;
    },
    getPlayerRankNative: (p) => {
      return 0;
    },
    gradient: ["transparent", graphColors.green],
  },
  {
    id: "WC GBoot",
    labelLong: "World Cup Golden Boot",
    label: "WC Golden Boot",
    labelShort: "WC GBoot",
    sortAlg: (p1, p2) => {
      return p2["WC GBoot"] - p1["WC GBoot"];
    },
    getPlayerValue: (p) => {
      return p["WC GBoot"];
    },
    getPlayerRank: (p) => {
      return 0;
    },
    getPlayerRankNative: (p) => {
      return 0;
    },
    gradient: ["transparent", graphColors.pink],
  },
  {
    id: "WC SBoot",
    labelLong: "World Cup Silver Boot",
    label: "WC Silver Boot",
    labelShort: "WC SBoot",
    sortAlg: (p1, p2) => {
      return p2["WC SBoot"] - p1["WC SBoot"];
    },
    getPlayerValue: (p) => {
      return p["WC SBoot"];
    },
    getPlayerRank: (p) => {
      return 0;
    },
    getPlayerRankNative: (p) => {
      return 0;
    },
    gradient: ["transparent", "#AF95FC"],
  },
  {
    id: "WC BBoot",
    labelLong: "World Cup Bronze Boot",
    label: "WC Bronze Boot",
    labelShort: "WC BBoot",
    sortAlg: (p1, p2) => {
      return p2["WC BBoot"] - p1["WC BBoot"];
    },
    getPlayerValue: (p) => {
      return p["WC BBoot"];
    },
    getPlayerRank: (p) => {
      return 0;
    },
    getPlayerRankNative: (p) => {
      return 0;
    },
    gradient: ["transparent", graphColors.green],
  },
  {
    id: "UCL Goals",
    labelLong: "UCL Goals",
    label: "UCL Goals",
    labelShort: "UCL Goals",
    dataCeiling: 160,
    sortAlg: (p1, p2) => {
      return p2["UCL Goals"] - p1["UCL Goals"];
    },
    getPlayerValue: (p) => {
      return p["UCL Goals"];
    },
    getPlayerRank: (p) => {
      return 0;
    },
    getPlayerRankNative: (p) => {
      return 0;
    },
    gradient: ["transparent", graphColors.pink],
  },
  {
    id: "UCL Assists",
    labelLong: "UCL Assists",
    label: "UCL Assists",
    labelShort: "UCL Assists",
    dataCeiling: 160,
    sortAlg: (p1, p2) => {
      return p2["UCL Assists"] - p1["UCL Assists"];
    },
    getPlayerValue: (p) => {
      return p["UCL Assists"];
    },
    getPlayerRank: (p) => {
      return 0;
    },
    getPlayerRankNative: (p) => {
      return 0;
    },
    gradient: ["transparent", "#AF95FC"],
  },
  {
    id: "UCL FGoals",
    labelLong: "UEFA Champions League Finals Goals",
    label: "UCL Finals Goals",
    labelShort: "UCL FGoals",
    sortAlg: (p1, p2) => {
      return p2["UCL FGoals"] - p1["UCL FGoals"];
    },
    getPlayerValue: (p) => {
      return p["UCL FGoals"];
    },
    getPlayerRank: (p) => {
      return 0;
    },
    getPlayerRankNative: (p) => {
      return 0;
    },
    gradient: ["transparent", graphColors.green],
  },
  {
    id: "FreeKicks",
    labelLong: "FreeKicks",
    label: "FreeKicks",
    labelShort: "FKs",
    dataCeiling: 200,
    sortAlg: (p1, p2) => {
      return p2["FreeKicks"] - p1["FreeKicks"];
    },
    getPlayerValue: (p) => {
      return p["FreeKicks"];
    },
    getPlayerRank: (p) => {
      return 0;
    },
    getPlayerRankNative: (p) => {
      return 0;
    },
    gradient: ["transparent", graphColors.pink],
  },
  {
    id: "Penalties",
    labelLong: "Penalties",
    label: "Penalties",
    labelShort: "PKs",
    dataCeiling: 200,
    sortAlg: (p1, p2) => {
      return p2["Penalties"] - p1["Penalties"];
    },
    getPlayerValue: (p) => {
      return p["Penalties"];
    },
    getPlayerRank: (p) => {
      return 0;
    },
    getPlayerRankNative: (p) => {
      return 0;
    },
    gradient: ["transparent", "#AF95FC"],
  },
  {
    id: "OutsideBox",
    labelLong: "Outside Box Goals",
    label: "Outside Box Goals",
    labelShort: "OBox Goals",
    sortAlg: (p1, p2) => {
      return p2["OutsideBox"] - p1["OutsideBox"];
    },
    getPlayerValue: (p) => {
      return p["OutsideBox"];
    },
    getPlayerRank: (p) => {
      return 0;
    },
    getPlayerRankNative: (p) => {
      return 0;
    },
    gradient: ["transparent", graphColors.green],
  },
  {
    id: "InsideBox",
    labelLong: "Inside Box Goals",
    label: "Inside Box Goals",
    labelShort: "IBox Goals",
    sortAlg: (p1, p2) => {
      return p2["InsideBox"] - p1["InsideBox"];
    },
    getPlayerValue: (p) => {
      return p["InsideBox"];
    },
    getPlayerRank: (p) => {
      return 0;
    },
    getPlayerRankNative: (p) => {
      return 0;
    },
    gradient: ["transparent", graphColors.pink],
  },
  {
    id: "LeftFoot",
    labelLong: "Left Foot Goals",
    label: "Left Foot Goals",
    labelShort: "LFoot Goals",
    sortAlg: (p1, p2) => {
      return p2["LeftFoot"] - p1["LeftFoot"];
    },
    getPlayerValue: (p) => {
      return p["LeftFoot"];
    },
    getPlayerRank: (p) => {
      return 0;
    },
    getPlayerRankNative: (p) => {
      return 0;
    },
    gradient: ["transparent", "#AF95FC"],
  },
  {
    id: "RightFoot",
    labelLong: "Right Foot Goals",
    label: "Right Foot Goals",
    labelShort: "RFoot Goals",
    sortAlg: (p1, p2) => {
      return p2["RightFoot"] - p1["RightFoot"];
    },
    getPlayerValue: (p) => {
      return p["RightFoot"];
    },
    getPlayerRank: (p) => {
      return 0;
    },
    getPlayerRankNative: (p) => {
      return 0;
    },
    gradient: ["transparent", graphColors.green],
  },
  {
    id: "Headers",
    labelLong: "Header Goals",
    label: "Header Goals",
    labelShort: "Headers",
    sortAlg: (p1, p2) => {
      return p2["Headers"] - p1["Headers"];
    },
    getPlayerValue: (p) => {
      return p["Headers"];
    },
    getPlayerRank: (p) => {
      return 0;
    },
    getPlayerRankNative: (p) => {
      return 0;
    },
    gradient: ["transparent", graphColors.pink],
  },
];
