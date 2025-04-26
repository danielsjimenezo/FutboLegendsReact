import { useState } from "react";
import { usePlayerContext } from "../context/PlayerContext.jsx";
import GoalsChart from "./GoalsChart.jsx";
import AssistsChart from "./AssistsChart.jsx";
import ContributionsChart from "./ContributionsChart.jsx";
import EfficiencyChart from "./EfficiencyChart.jsx";
import HomePageChartSelectorMenu from "./HomePageChartSelectorMenu.jsx";

const CHARTS = {
    goals: GoalsChart,
    assists: AssistsChart,
    contributions: ContributionsChart,
    efficiency: EfficiencyChart
}

const LABELS = {
    goals: "Goals scored",
    assists: "Assists",
    contributions: "Goals + Assists",
    efficiency: "Goals + Assists per Game"
}

function HomePageChartSelector({ chartKey, setter }) {

    const SelectedChartComponent = CHARTS[chartKey]

    return (
        <div className="homepage-chart">
            <p>{LABELS[chartKey]}</p>
            <SelectedChartComponent />
            <HomePageChartSelectorMenu LABELS={LABELS} chartKey={chartKey} setter={setter} />
        </div>
    )
}

export default HomePageChartSelector;