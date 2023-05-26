import React, { useEffect, useState } from "react";
import { Card, Dropdown } from "react-bootstrap";
import Loading from "../components/Loading/Loading";
import axios from "axios";
import { BASEURL } from "../components/Constants/Constants";
import TestCard from "./TestCard";

function CoursesUser() {
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

    setCourse(result.data.response);
    // setfilterdCourse(Course);
    // console.log(Course, "course");
  };

  const handleSearch = async (e) => {
    const input = e.target.value;

    await axios.get(`${BASEURL}/Search?searchTerm=${input}`).then((res) => {
      console.log(res.data.res);
      setCourse(res.data.res);
      if (input == "") {
        setRefresh(!refresh);
      }
    });
  };
  return (
    <>
      <div className=" d-flex justify-content-center">
        <div className="HeadDiv rounded-4 col-lg-12 col-sm-3 d-flex justify-content-center   p-lg-3">
          <h2 className="text-light">Our Courses</h2>
        </div>
      </div>
      <div className="d-flex justify-content-lg-between">
        <div className="d-flex  flex-row ms-lg-5 mt-3">
          <Dropdown className="">
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
              Filter
            </Dropdown.Toggle>

            <Dropdown.Menu className="bg-dark bg-gradient">
              <Dropdown.Item className="text-light" href="#action/1">
                Relevence
              </Dropdown.Item>
              <Dropdown.Item className="text-light" href="#action/2">
                Popularity
              </Dropdown.Item>
              <Dropdown.Divider />
              {/* <Dropdown>
                <Dropdown.Toggle
                  variant=""
                  className="ms-1 text-light"
                  id="dropdown-basic"
                >
                  Categories
                </Dropdown.Toggle>
                <Dropdown.Menu className="bg-dark ms-lg-5">
                  {Clist.length > 0
                    ? Clist.map((item, index) => (
                        <Dropdown.Item
                          key={item._id}
                          className="text-white bg-gradient"
                          href="#action/3"
                          onClick={() => handleCategory(item.CategoryName)}
                        >
                          {item.CategoryName}
                        </Dropdown.Item>
                      ))
                    : ""}
                </Dropdown.Menu>
              </Dropdown> */}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="me-5 mt-3">
          <input
            className="me-1 rounded-2 bg-dark bg-gradient"
            type="search"
            placeholder=" Search here"
            name=""
            onChange={handleSearch}
            id=""
          />
        </div>
      </div>
      <div className=" d-flex ps-3 justify-content-center">
        <div className="col-10  cardshow float-end mt-4">
          {course.length > 0 ? (
            course.map((item, index) => <TestCard data={item}></TestCard>)
          ) : (
            <div className="">
              <Loading Title="Loading"></Loading>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CoursesUser;
