// defines bar colors
const barColors = ["#FF4F8B"];
const barColors2 = ["#AF95FC"];

let obj = {
  a: 1,
  b: 2,
};

obj.a; // -> 1
obj["a"]; // -> 1
let banana = "a";
obj[banana]; // -> 1

function createChart(canvasId, data, key, start = 0, end = 20) {
  // filter
  const filtered = [...data].slice(start, end).filter((p) => p[key] > 0);

  // sort
  filtered.sort((a, b) => b[key] - a[key]);

  // get labels
  const labels = filtered.map((p) => p.Player);

  // get dataset
  const dataset = filtered.map((p) => p[key]);

  const chart = new Chart(canvasId, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          backgroundColor: barColors,
          data: dataset,
          borderRadius: 5,
          base: 1,
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
    },
  });

  return chart;
}

export default createChart;
