export function createGoalTypeChart2(player) {
  const goalTypeData2 = [
    player.LeftFoot,
    player.RightFoot,
    player.Headers,
    player.Other,
  ];
  const goalTypeChart2 = new Chart("circleChart2", {
    type: "bar",
    data: {
      labels: ["Left Foot", "Right Foot", "Headers", "Other"],
      datasets: [
        {
          backgroundColor: ["#2BC1B7"],
          data: goalTypeData2,
          borderRadius: {
            topRight: 50,
            bottomRight: 50,
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
  });
}
