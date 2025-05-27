// @ts-check

/*

*/

import { graphColors } from "./utilities.js";

/**
 * @typedef {Record<string, any>} Player
 * @typedef {[string, string, number?, number?, number?, number?]} Gradient
 */

/**
 * @typedef ChartConfig
 * @property {string} id
 * @property {string} label
 * @property {Gradient} [gradient]
 * @property {(p: Player) => number} [getPlayerValue]
 */

/**
 * @typedef FutbolDataType
 * @property {string} id A unique identifier for the data type. Does not appear in the UI.
 * @property {string} labelLong appears in UI
 * @property {string} label appears in UI
 * @property {string} labelShort appears in UI
 * @property {(p1: Player, p2: Player) => number} [sortAlg]
 * @property {(p: Player) => number} [getPlayerValue]
 * @property {(p: Player) => number} [getPlayerRank]
 * @property {(p: Player) => number} [getPlayerRankNative]
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
    gradient: ["transparent", "yellow"],
  },
  {
    id: "goals",
    labelLong: "Goals",
    label: "Goals",
    labelShort: "Goals",
    dataCeiling: 1400,
    gradient: ["transparent", graphColors.green]
  },
  {
    id: "assists",
    labelLong: "Assists",
    label: "Assists",
    labelShort: "Assists",
    dataCeiling: 1400,
    gradient: ["transparent", graphColors.green],
  },
  {
    id: "contributions",
    labelLong: " Goal Contributions",
    label: "Goals Contributions",
    labelShort: "GC",
    dataCeiling: 1400,
    multiData: [
      {
        id: "goals",
        label: "Goals",
        gradient: ["transparent", graphColors.pink, 0, 200, 0, 0],
      },
      {
        id: "assists",
        label: "Assists",
        gradient: ["transparent", graphColors.purple, 0, 200, 0, 0],
      },
    ],
  },
  {
    id: "efficiency",
    labelLong: "Goal Efficiency",
    label: "Goal Efficiency",
    labelShort: "GE",
    dataCeiling: 3,
  },
  {
    id: "balon1",
    labelLong: "Balón d'or (1st)",
    label: "Balón (1st)",
    labelShort: "Balón (1st)",
    dataCeiling: 10,
    gradient: ["transparent", graphColors.pink],
  },
  {
    id: "balon2",
    labelLong: "Balón d'or (2nd)",
    label: "Balón (2nd)",
    labelShort: "Balón (2nd)",
    dataCeiling: 10,
    gradient: ["transparent", "#AF95FC"],
  },
  {
    id: "balon3",
    labelLong: "Balón d'or (3rd",
    label: "Balón (3rd)",
    labelShort: "Balón (3rd)",
    dataCeiling: 10,
    gradient: ["transparent", graphColors.green],
  },
  {
    id: "balonTop3",
    labelLong: "Balón d'Or (top 3)",
    label: "Balón d'Or (top 3)",
    labelShort: "Balón d'Or (top 3)",
    dataCeiling: 20,
  },
  {
    id: "wcGoals",
    labelLong: "World Cup Goals",
    label: "WC Goals",
    labelShort: "WC Goals",
    dataCeiling: 20,
    gradient: ["transparent", graphColors.pink],
  },
  {
    id: "wcAssists",
    labelLong: "World Cup Assists",
    label: "WC Assists",
    labelShort: "WC Assists",
    dataCeiling: 15,
    gradient: ["transparent", "#AF95FC"],
  },
  {
    id: "wcFGoals",
    labelLong: "World Cup Finals Goals",
    label: "WC Finals Goals",
    labelShort: "WC FGoals",
    gradient: ["transparent", graphColors.green],
  },
  {
    id: "wcGBall",
    labelLong: "World Cup Golden Ball",
    label: "WC Golden Ball",
    labelShort: "WC GBall",
    gradient: ["transparent", graphColors.pink],
  },
  {
    id: "wcSBall",
    labelLong: "World Cup Silver Ball",
    label: "WC Silver Ball",
    labelShort: "WC SBall",
    gradient: ["transparent", "#AF95FC"],
  },
  {
    id: "wcBBall",
    labelLong: "World Cup Bronze Ball",
    label: "WC Bronze Ball",
    labelShort: "WC BBall",
    gradient: ["transparent", graphColors.green],
  },
  {
    id: "wcGBoot",
    labelLong: "World Cup Golden Boot",
    label: "WC Golden Boot",
    labelShort: "WC GBoot",
    gradient: ["transparent", graphColors.pink],
  },
  {
    id: "wcSBoot",
    labelLong: "World Cup Silver Boot",
    label: "WC Silver Boot",
    labelShort: "WC SBoot",
    gradient: ["transparent", "#AF95FC"],
  },
  {
    id: "wcBBoot",
    labelLong: "World Cup Bronze Boot",
    label: "WC Bronze Boot",
    labelShort: "WC BBoot",
    gradient: ["transparent", graphColors.green],
  },
  {
    id: "uclGoals",
    labelLong: "UCL Goals",
    label: "UCL Goals",
    labelShort: "UCL Goals",
    dataCeiling: 160,
    gradient: ["transparent", graphColors.pink],
  },
  {
    id: "uclAssists",
    labelLong: "UCL Assists",
    label: "UCL Assists",
    labelShort: "UCL Assists",
    dataCeiling: 160,
    gradient: ["transparent", "#AF95FC"],
  },
  {
    id: "uclFGoals",
    labelLong: "UEFA Champions League Finals Goals",
    label: "UCL Finals Goals",
    labelShort: "UCL FGoals",
    gradient: ["transparent", graphColors.green],
  },
  {
    id: "freekicks",
    labelLong: "Freekicks",
    label: "Freekicks",
    labelShort: "FKs",
    dataCeiling: 200,
    gradient: ["transparent", graphColors.pink],
  },
  {
    id: "penalties",
    labelLong: "Penalties",
    label: "Penalties",
    labelShort: "PKs",
    dataCeiling: 200,
    gradient: ["transparent", "#AF95FC"],
  },
  {
    id: "outsideBox",
    labelLong: "Outside Box Goals",
    label: "Outside Box Goals",
    labelShort: "OBox Goals",
    gradient: ["transparent", graphColors.green],
  },
  {
    id: "insideBox",
    labelLong: "Inside Box Goals",
    label: "Inside Box Goals",
    labelShort: "IBox Goals",
    gradient: ["transparent", graphColors.pink],
  },
  {
    id: "leftFoot",
    labelLong: "Left Foot Goals",
    label: "Left Foot Goals",
    labelShort: "LFoot Goals",
    gradient: ["transparent", "#AF95FC"],
  },
  {
    id: "rightFoot",
    labelLong: "Right Foot Goals",
    label: "Right Foot Goals",
    labelShort: "RFoot Goals",
    gradient: ["transparent", graphColors.green],
  },
  {
    id: "headers",
    labelLong: "Header Goals",
    label: "Header Goals",
    labelShort: "Headers",
    gradient: ["transparent", graphColors.pink],
  },
];
