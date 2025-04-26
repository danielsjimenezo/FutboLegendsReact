import Chart from './Chart.jsx'
import { usePlayerContext } from '../context/PlayerContext.jsx';

import { HOME_PAGE_CHART_ASPECT_RATIO } from '../utilities/utilities.js';

function createGradient(color1, color2, x1 = 0, y1 = 0, x2 = 300, y2 = 0) {
  return (ctx) => {
    const canvas = ctx.chart.ctx;
    const gradient = canvas.createLinearGradient(x1, y1, x2, y2);

    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);

    return gradient;
  };
}

function ContributionsChart() {

    const { displayedPlayers } = usePlayerContext()

    const sorted = displayedPlayers.toSorted((a, b) => {
        return (b.Goals + b.Assists) - (a.Goals + a.Assists)
    })

    const names = sorted.map(p => p.Player)
    const goalData = sorted.map(p => p.Goals)
    const assistData = sorted.map(p => p.Assists || null)

    return (
        <>
            <Chart options={{
                type: "bar",
                data: {
                    labels: names,
                    datasets: [
                        {
                            // backgroundColor: "#FF4F8B",
                            backgroundColor: createGradient("transparent", "#FF4F8B"),
                            data: goalData,
                            borderRadius: {
                                topRight: 10,
                                bottomRight: 10,
                            },
                            base: 1,
                            label: "Goals",
                        },
                        {
                            // backgroundColor: "#AF95FC",
                            backgroundColor: createGradient(
                                "transparent",
                                "#AF95FC",
                                200,
                                0,
                                300,
                                0
                            ),
                            data: assistData,
                            borderRadius: 10,
                            base: 1,
                            label: "Assists",
                        },
                    ],
                },
                options: {
                    indexAxis: "y",
                    plugins: {
                        legend: {
                            display: false,
                        },
                    },
                    scales: {
                        y: {
                            stacked: true,
                            ticks: { color: "white" },
                        },
                        x: {
                            stacked: true,
                            ticks: { color: "white" },
                        },
                    },
                    aspectRatio: HOME_PAGE_CHART_ASPECT_RATIO,
                },
            }} />
        </>
    )
}

export default ContributionsChart