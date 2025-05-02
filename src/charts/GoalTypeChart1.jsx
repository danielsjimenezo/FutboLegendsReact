import Chart from "./Chart.jsx"
import { GOAL_TYPE_CHART_ASPECT_RATIO } from "../utilities/utilities.js"

function GoalTypeChart1({ player, id }) {
    const goalTypeData = [
        player.FreeKicks,
        player.Penalties,
        player.OutsideBox,
        player.InsideBox,
    ]

    return (
        <Chart id={id} options={{
            type: "bar",
            data: {
                labels: ["Free kicks", "Penaties", "Outside box", "Inside box"],
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
                },
            },
        }} />
    )
}

export default GoalTypeChart1