export function createGoalTypeChart(player) {
  const goalTypeData = [
    player.FreeKicks,
    player.Penalties,
    player.OutsideBox,
    player.InsideBox,
  ];
  return new Chart("circleChart1", {
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
  });
}
