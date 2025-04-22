import Chart from './Chart.jsx'
import { usePlayerContext } from '../context/PlayerContext.jsx'

const ASPECT_RATIO = 1 / 0.45

function createGradient(color1, color2, x1 = 0, y1 = 0, x2 = 300, y2 = 0) {
    return (ctx) => {
        const canvas = ctx.chart.ctx
        const gradient = canvas.createLinearGradient(x1, y1, x2, y2)

        gradient.addColorStop(0, color1)
        gradient.addColorStop(1, color2)

        return gradient
    }
}

function AssistsChart() {

    const { displayedPlayers } = usePlayerContext()

    const sorted = displayedPlayers.toSorted((a, b) => {
        return b.Assists - a.Assists
    })

    const names = sorted.map(p => p.Player)
    const assistData = sorted.map(p => p.Assists || null)

    return (
        <>
            <Chart options={{
                type: "bar",
                data: {
                    labels: names,
                    datasets: [
                        {
                            backgroundColor: createGradient("transparent", "#AF95FC"),
                            data: assistData,
                            borderRadius: {
                                topRight: 10,
                                bottomRight: 10,
                            },
                            base: 0,
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
                        x: {
                            beginAtZero: true,
                            ticks: { color: "white" },
                        },
                        y: {
                            beginAtZero: true,
                            ticks: { color: "white" },
                        },
                    },
                    aspectRatio: ASPECT_RATIO,
                },
            }} />
        </>
    )
}

export default AssistsChart