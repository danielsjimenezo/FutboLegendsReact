import Chart from "./Chart.jsx";
import {
  GOAL_TYPE_CHART_ASPECT_RATIO,
  createGradient,
} from "../utilities/utilities.js";

function GoalTypeChart1({ player, id }) {
  const goalTypeData = [
    player.freekicks,
    player.penalties,
    player.outsideBox,
    player.insideBox,
    player.cornerKicks,
    player.acrobatics,
    player.volleys,
    // player.Backheels
  ];

  return (
    <Chart
      id={id}
      options={{
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
              backgroundColor: createGradient("transparent", "#FF4F8B", 0, 120),
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
                  type: "line",
                  yMin: goalTypeData.length - 0.5,
                  yMax: goalTypeData.length - 0.5,
                  borderColor: "white",
                  borderWidth: 2,
                  label: {
                    content: "Target",
                    enabled: true,
                    position: "start",
                  },
                },
                verticalLine: {
                  type: "line",
                  xMin: 3,
                  xMax: 3,
                  borderColor: "white",
                  borderWidth: 2,
                  label: {
                    content: "Event",
                    enabled: true,
                    position: "top",
                  },
                },
              },
            },
          },
          scales: {
            x: {
              ticks: {
                color: "transparent",
              },
            },
            y: {
              ticks: {
                color: "white",
              },
            },
          },
        },
      }}
    />
  );
}

export default GoalTypeChart1;
