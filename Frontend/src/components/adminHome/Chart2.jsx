import ApexCharts from "apexcharts";
import React, { useEffect, useRef, useState } from "react";
import { BASEURL } from "../Constants/Constants";
import axios from "axios";

function Chart2() {
  const chartRef = useRef(null);

  const [coursePercentage, setCoursePerc] = useState([]);
  const [category,setCategory] = useState([]);
  

  useEffect(() => {
    getCoursePercentage();
    getCategories();  
  }, []);
  
  
  const getCategories = async () => {
    await axios.get(`${BASEURL}/Getcategories`).then(async(res) => {
      setCategory(res.data.res.map((obj)=>{
        return obj.CategoryName
      }))
    });
  };

  // useEffect(() => {
  //   setCategoryArray(Array.from(category, (item) => item.CategoryName));
    
  // }, [categoryArray.length,category]);
  // console.log(categoryArray);
  const getCoursePercentage = async () => {
    await axios.get(`${BASEURL}/CoursePercentage`).then((response) => {
      console.log(response.data.res, "res");
      setCoursePerc(response.data.res.map((obj)=>{
        return obj.count
      }));

      
    });
  };

  useEffect(() => {
    const options = {
      series:coursePercentage ?? [1, 2, 3, 4],
      chart: {
        type: "donut",
      },
      labels: category ?? ['loading','loading','loading','loading'],
      colors: ["#F15B24", "#F6931E", "#FFB93B", "#FF2B25"],
      title: {
        text: "Distribution of Courses",
        align: "center",
        style: {
          fontSize: "13px",
          fontWeight: "bold",
          color: "#baadae",
        },
      },
      legend: {
        position: "bottom",
        labels: {
          colors: ["#baadae"],
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    };

    const chart = new ApexCharts(chartRef.current, options);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, [category.length,coursePercentage.length]);

  return <div ref={chartRef} />;
}

export default Chart2;
