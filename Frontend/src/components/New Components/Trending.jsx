import React, { useEffect, useState } from "react";
import "../New Components/News.css";
import { Row } from "react-bootstrap";
import TestCard from "../../pages/TestCard";
import { BASEURL } from "../Constants/Constants";
import axios from "axios";
import Loading from "../Loading/Loading";
import {AiOutlineDoubleLeft} from "react-icons/ai"
import {AiOutlineDoubleRight} from "react-icons/ai"

function Trending() {
  const [course, setCourse] = useState([]);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    GetCourses();
  }, [refresh]);

  const GetCourses = async () => {
    const url = `${BASEURL}/Allcourse`;

    const result = await axios(url, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });

    setCourse(result.data.response.slice(-6));
    // setfilterdCourse(Course);
    // console.log(Course, "course");
  };

  return (
    <>
      <div className="text-white ms-5 mb-4">
        <h3 className="ms-5 mt-4 mb-4 ">Recent Updates</h3>
      </div>
      <div className="d-flex  justify-content-center mt-4 mb-4 ">
        <div className="d-flex col-9 scrolling-wrapper  bg-gradient rounded-3 ">
          {course.length > 0 ? (
            course.map((item, indx) => <TestCard data={item}></TestCard>)
          ) : (
            <Loading></Loading>
          )}
        </div>
      
      </div>
    </>
  );
}

export default Trending;
