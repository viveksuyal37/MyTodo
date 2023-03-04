import React, { useContext, useEffect } from "react";
import StateContext from "../../../Context/StateContext";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = () => {
  const [appState, setAppState] = useContext(StateContext);

  const today = new Date(Date.now()).toISOString().split("T")[0];

  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];
  const dayBeforeYesterday = new Date(Date.now() - 24 * 2 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];
  const twodayBeforeYesterday = new Date(Date.now() - 24 * 3 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  let datedTodoArray = [0, 0, 0, 0];

  const calculateData = () => {
    if (!appState.Todos) {
      return;
    }
    appState.Todos.forEach((item) => {
      if (item.createdAt.includes(today)) {
        datedTodoArray[3]++;
      } else if (item.createdAt.includes(yesterday)) {
        datedTodoArray[2]++;
      } else if (item.createdAt.includes(dayBeforeYesterday)) {
        datedTodoArray[1]++;
      } else if (item.createdAt.includes(twodayBeforeYesterday)) {
        datedTodoArray[0]++;
      }
    });
  };
  calculateData();

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "No of todos added by me",
      },
    },
  };

  const labels = [
    twodayBeforeYesterday,
    dayBeforeYesterday,
    "yesterday",
    "Today",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "No. of Todos",
        data: datedTodoArray,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div className="chart-container">
      <h2 className="chart-title">My recent activity :</h2>
      <Line className="chart" options={options} data={data} />
    </div>
  );
};

export default Chart;
