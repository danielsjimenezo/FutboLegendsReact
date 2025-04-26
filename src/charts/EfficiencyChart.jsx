import Chart from './Chart.jsx'
import { usePlayerContext } from '../context/PlayerContext.jsx'

import { HOME_PAGE_CHART_ASPECT_RATIO } from '../utilities/utilities.js'

function createGradient(color1, color2, x1 = 0, y1 = 0, x2 = 300, y2 = 0) {
    return (ctx) => {
        const canvas = ctx.chart.ctx
        const gradient = canvas.createLinearGradient(x1, y1, x2, y2)

        gradient.addColorStop(0, color1)
        gradient.addColorStop(1, color2)

        return gradient
    }
}

function percentToNumber(str) {
  return Number(str);
}

function EfficiencyChart() {

    const { displayedPlayers } = usePlayerContext()

    // const sorted = displayedPlayers.toSorted((a, b) => {
    //     return b.Efficiency - a.Efficiency
    // })

    const names = displayedPlayers.map(p => p.Player)
    const efficiencyData = displayedPlayers.map(p => percentToNumber(p.Efficiency))

    return (
        <>
            <Chart options={{
                type: "bar",
                data: {
                    labels: names,
                    datasets: [
                        {
                            backgroundColor: createGradient("transparent", "#2BC1B7"),
                            data: efficiencyData,
                            borderRadius: {
                                topRight: 10,
                                bottomRight: 10,
                            },
                            base: 0,
                            label: "G+A/Games",
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
                        x: {
                            beginAtZero: true,
                            ticks: { color: "white" },
                        },
                        y: {
                            beginAtZero: true,
                            ticks: { color: "white" },
                        },
                    },
                    aspectRatio: HOME_PAGE_CHART_ASPECT_RATIO,
                },
            }} />
        </>
    )
}

export default EfficiencyChart