import React from "react";
import Chart from "../../../components/adminHome/Chart";
import Chart2 from "../../../components/adminHome/Chart2";
import Card from "../../../components/adminHome/Card";
import "../../../components/adminHome/adminHome.css";
import UserTable from "../../../components/adminHome/Table";
import RecentCourses from "../../../components/adminHome/RecentCourses";
import Footer from "../../../components/adminHome/Footer/Footer";
import "../Adminhome/AdminHome.css";
import { useEffect } from "react";
import axios from "axios";
import { BASEURL } from "../../../components/Constants/Constants";
import { useState } from "react";

function AdminHome() {
  const [totalUsers, setTotal] = useState(0);
  const [totalMentors, setTotalMentors] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);

  useEffect(() => {
    getmentordata();
    getCoursesCount();
  }, []);

  const getmentordata = async () => {
    await axios.get(`${BASEURL}/mentors`).then((res) => {
      setTotalMentors(res.data.totalusers);
    });
  };

  const getCoursesCount = async () => {
    await axios.get(`${BASEURL}/totalCourses`).then((res) => {
      setTotalCourses(res.data.msg);
    });
  };

  return (
    <>
      <div className="HeadDiv rounded-4   d-flex justify-content-between   p-lg-3">
        <div className="col-2  d-flex justify-content-end ms-1">
          <h2 className="text-light  heading">Dashboard</h2>
        </div>
        <div className="col-6 d-flex justify-content-end me-5">
          <span style={{ color: "#7D7D8A" }} className="me-5  overview">
            Overview
          </span>
        </div>
      </div>

      <div className="d-flex justify-content-between"></div>
      <div className=" d-flex justify-content-evenly p-2 pt-4 ">
        <Card data={"Users"} value={totalUsers}></Card>
        <Card data={"Mentors"} value={totalMentors}></Card>
        <Card data={"Courses"} value={totalCourses}></Card>
      </div>

      <div className="d-flex justify-content-evenly">
        <div className="col-6 p-5 m-2">
          <Chart></Chart>
        </div>
        <div className="col-4 p-2 mt-3 ">
          <Chart2></Chart2>
        </div>
      </div>
      <div className="col-12 m-2 mt-4  d-flex justify-content-evenly">
        <div className=" col-4 float-start bg-dark rounded-3  bg-gradient">
          <h4 className="text-white m-1">Recent Users</h4>
          <UserTable setTotal={setTotal}></UserTable>
        </div>
        <div className="col-4 bg-dark bg-gradient rounded-3 recent-Course ">
          <h4 className="text-white m-1">Recent Courses</h4>

          <RecentCourses></RecentCourses>
        </div>
      </div>
      <div className="mt-5">
        <Footer></Footer>
      </div>
    </>
  );
}

export default AdminHome;
