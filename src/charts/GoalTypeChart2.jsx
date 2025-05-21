import Chart from "./Chart.jsx"
import { GOAL_TYPE_CHART_ASPECT_RATIO } from "../utilities/utilities.js"

function GoalTypeChart2({ player, id }) {
    const goalTypeData = [
        player.leftFoot,
        player.rightFoot,
        player.headers,
        // player.Other,
    ]

    return (
        <Chart id={id} options={{
            type: "doughnut",
            data: {
                labels: [
                    "Left Foot", 
                    "Right Foot", 
                    "Headers",
                    // "Other"
                ],
                datasets: [
                    {
                        backgroundColor: ["#FF4F8B", "#af95fc", "#62b3ad"],
                        borderWidth: 0, // Removes white borders
                        data: goalTypeData,
                        label: "Goals"
                    }
                ]
            },
            options: {
                aspectRatio: GOAL_TYPE_CHART_ASPECT_RATIO,
                plugins: {
                    legend: {
                        display: true,
                        position: "right",
                        labels: {
                            usePointStyle: true,
                            pointStyle: 'circle',
                            padding: 40,
                            color: 'white',
                            boxWidth: 200
                        }
                    }
                }
            }
        }

        } />
    )
}

export default GoalTypeChart2