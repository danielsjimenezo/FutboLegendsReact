import Chart from "./Chart.jsx"

function GoalTypeChart2({ player, id }) {
    const goalTypeData = [
        player.LeftFoot,
        player.RightFoot,
        player.Headers,
        player.Other,
    ]

    return (
        <Chart id={id} options={{
            type: "bar",
            data: {
                labels: ["Left Foot", "Right Foot", "Headers", "Other"],
                datasets: [
                    {
                        backgroundColor: ["#2BC1B7"],
                        data: goalTypeData,
                        borderRadius: {
                            topRight: 50,
                            topLeft: 50,
                        },
                        base: 0,
                        label: "Goals",
                    },
                ],
            },
            options: {
                aspectRatio: 1 / 1.05,
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

export default GoalTypeChart2