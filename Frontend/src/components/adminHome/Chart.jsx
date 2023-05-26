import ApexCharts from "apexcharts";
import React, { useEffect, useRef } from "react";

function Chart() {
  const chartRef = useRef(null);

  useEffect(() => {
    const options = {
      series: [
        {
          name: "Desktops",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
        },
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },style: {
   
          color:'#F15B24',
        }
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: "Users Visted Trends by Month",
        align: "left",
        style: {
          fontSize: '13px',
          fontWeight: 'bold',
          color:'#baadae',
        }
      },
      grid: {
        row: {
          colors: ["#F15B24", "transparent"],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
      },
    };

    const chart = new ApexCharts(chartRef.current, options);
    chart.render();
  }, []);

  return <div id="chart" ref={chartRef}></div>;
}

export default Chart;   
