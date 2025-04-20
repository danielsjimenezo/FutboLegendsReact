import Chart from "./Chart.jsx"

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
                            topLeft: 50,
                        },
                        base: 0,
                        label: "Goals",
                    },
                ],
            },
            options: {
                aspectRatio: 1 / 1.05,
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