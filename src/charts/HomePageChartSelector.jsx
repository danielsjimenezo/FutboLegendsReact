import { useState } from "react";
import { usePlayerContext } from "../context/PlayerContext.jsx";
import GoalsChart from "./GoalsChart.jsx";
import AssistsChart from "./AssistsChart.jsx";
import ContributionsChart from "./ContributionsChart.jsx";
import EfficiencyChart from "./EfficiencyChart.jsx";
import GamesChart from "./GamesChart.jsx";
import Balon1Chart from "./Balon1Chart.jsx";
import Balon2Chart from "./Balon2Chart.jsx";
import HomePageChartSelectorMenu from "./HomePageChartSelectorMenu.jsx";
import "./HomePageChartSelector.css";

const CHARTS = {
  goals: GoalsChart,
  assists: AssistsChart,
  contributions: ContributionsChart,
  efficiency: EfficiencyChart,
  games: GamesChart,
  balon1: Balon1Chart,
  balon2: Balon2Chart,
};

const LABELS = {
  goals: "Goals scored",
  assists: "Assists",
  contributions: "Goals + Assists",
  efficiency: "Goals + Assists per Game",
  games: "Games Played",
  balon1: "Balón D'or (1st)",
  balon2: "Balón D'or (2nd)",
};

function HomePageChartSelector({ chartKey, setter, readAllPlayers = false, id }) {
  const SelectedChartComponent = CHARTS[chartKey];

  if (!SelectedChartComponent) {
    return <p>Chart "{chartKey}" missing</p>;
  }

  return (
    <div className="homepage-chart">
      <p>
        {LABELS[chartKey]} {readAllPlayers ? "(all players)" : "(this page)"}
      </p>
      <SelectedChartComponent readAllPlayers={readAllPlayers} />
      <HomePageChartSelectorMenu
        LABELS={LABELS}
        chartKey={chartKey}
        setter={setter}
        id={id}
      />
    </div>
  );
}

export default HomePageChartSelector;
