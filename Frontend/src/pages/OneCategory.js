import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import { BASEURL } from "../components/Constants/Constants";
import TestCard from "./TestCard";
function OneCategory() {
  const Navigate = useNavigate();
  const [CourseList, setCourseList] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    GetallCourse();
  }, []);
  const GetallCourse = () => {
    axios.get(`${BASEURL}/getSpecificcategory/${id}`).then((res) => {
      console.log(res.data);
      setCourseList(res.data.response);
    });
  };

  return (
    <>
      <div className=" d-flex justify-content-center">
        <div className="HeadDiv rounded-4 col-lg-7 col-sm-3 d-flex justify-content-center   p-lg-3">
          <h2 className="text-light">
            {CourseList.length > 0 ? CourseList[0].Category : "In progress"}
          </h2>
        </div>
      </div>

      <div className="d-flex justify-content-center ">
        {CourseList.length > 0 ? (
          CourseList.map((item, indx) => <TestCard data={item}></TestCard>)
        ) : (
          <Loading></Loading>
        )}
      </div>
    </>
  );
}

export default OneCategory;
