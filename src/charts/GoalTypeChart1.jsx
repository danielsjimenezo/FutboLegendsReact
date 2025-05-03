import Chart from "./Chart.jsx"
import { GOAL_TYPE_CHART_ASPECT_RATIO } from "../utilities/utilities.js"

function GoalTypeChart1({ player, id }) {
    const goalTypeData = [
        player.FreeKicks,
        player.Penalties,
        player.OutsideBox,
        player.InsideBox,
        player.CornerKicks,
        player.Acrobatics,
        player.Volleys,
        // player.Backheels
    ]

    return (
        <Chart id={id} options={{
            type: "bar",
            data: {
                labels: [
                    "Free kicks",
                    "Penaties",
                    "Outside box",
                    "Inside box",
                    "Corner kicks",
                    "Acrobatics",
                    "Volleys",
                    // "Backheels"
                ],
                datasets: [
                    {
                        backgroundColor: ["#FF4F8B"],
                        data: goalTypeData,
                        borderRadius: {
                            topRight: 50,
                            bottomRight: 50,
                        },
                        barThickness: 20,
                        base: 0,
                        label: "Goals",
                    },
                ],
            },
            options: {
                aspectRatio: GOAL_TYPE_CHART_ASPECT_RATIO,
                indexAxis: "y",
                plugins: {
                    legend: {
                        display: false,
                    },
                    annotation: {
                        annotations: {
                            horizontalLine: {
                                type: 'line',
                                yMin: goalTypeData.length - 0.5,
                                yMax: goalTypeData.length - 0.5,
                                borderColor: 'white',
                                borderWidth: 2,
                                label: {
                                    content: 'Target',
                                    enabled: true,
                                    position: 'start'
                                }
                            },
                            verticalLine: {
                                type: 'line',
                                xMin: 3,
                                xMax: 3,
                                borderColor: 'white',
                                borderWidth: 2,
                                label: {
                                    content: 'Event',
                                    enabled: true,
                                    position: 'top'
                                }
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: 'transparent'
                        }
                    },
                    y: {
                        ticks: {
                            color: 'white'
                        }
                    },
                }
            },
        }} />
    )
}

export default GoalTypeChart1