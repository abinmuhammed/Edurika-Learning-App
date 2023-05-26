import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import Loading from "../../components/Loading/Loading";
import { io } from "socket.io-client";

import { BsFillEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { BASEURL } from "../../components/Constants/Constants";
import { sweetNote } from "../../components/sweetalert/sweetalert2";
import { showdelete } from "../../components/sweetalert/Deleteswal";
import Swal from "sweetalert2";

function CourseAManage() {
  const [Course, setCourse] = useState([]);
  const [filteredCourse, setfilterdCourse] = useState([]);
  const [Clist, setClist] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const socket = useRef();
  useEffect(() => {
    socket.current = io(`${BASEURL}`);
  }, []);

  const textcolor = {
    color: "rgb(255, 255, 255,0.55)",
  };

  useEffect(() => {
    GetCourses();
    GetCategories();
  }, [refresh]);

  useEffect(() => {
    setfilterdCourse(Course);
  }, [Course]);

  const GetCourses = async () => {
    const url = `${BASEURL}/Allcourse`;

    const result = await axios(url, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(result);
    setCourse(result.data.response);
    setfilterdCourse(Course);
    console.log(Course, "course");
  };

  const GetCategories = () => {
    axios.get(`${BASEURL}/Getcategories`).then((response) => {
      console.log(response.data.res);
      setClist(response.data.res);
    });
  };

  const handlefilter = (e) => {
    const input = e.target.value;
    console.log(input);

    if (Course.length > 0) {
      const filtered = Course.filter((Course) =>
        Course.Title.toLowerCase().includes(input.toLowerCase())
      );

      setfilterdCourse(filtered);
      console.log(filtered);
    }
  };

  const handleCategory = (name) => {
    name.toString();
    console.log(name);

    if (Course.length > 0) {
      const filtered = Course.filter((Course) =>
        Course.Category.toLowerCase().includes(name.toLowerCase())
      );
      setfilterdCourse(filtered);
      console.log(filtered);
    }
  };

  const handleVisible = async (id, Title, Author,userID) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    showdelete().then(async (result) => {
      if (result.isConfirmed) {
        socket.current.emit("course_disabled", { Title, Author });
        socket.current.emit("course_disabled_for_specific_Mentor", { Title, Author,userID });

        const notificationResult = await axios.post(`${BASEURL}/notification`, {
          notification:
            `${Title} course by ${Author} has been blocked by Admin`,
            userType:userID
        });

        await axios.put(`${BASEURL}/Courses?id=${id}`).then((resp) => {
          const Title = "course Disabled Succesfully";
          sweetNote(Title);
          setRefresh(!refresh);
        });
      } else {
        swalWithBootstrapButtons.fire(
          "Cancelled",
          "Current file is still visible :)",
          "error"
        );
      }
    });
  };

  const makevisible = async (id) => {
    await axios.put(`${BASEURL}/enable-Courses?id=${id}`).then((response) => {
      const Title = "course Enabled Succesfully";
      sweetNote(Title);
      setRefresh(!refresh);
    });
  };

  return (
    <>
      <div className="HeadDiv rounded-4   d-flex justify-content-center   p-lg-3">
        <h2 className="text-light">Course Management</h2>
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
              <Dropdown>
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
              </Dropdown>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div className="me-5 mt-3">
          <input
            className="me-1 rounded-2 bg-dark bg-gradient"
            type="search"
            placeholder=" Search here"
            name=""
            onChange={handlefilter}
            id=""
          />
        </div>
      </div>

      <div className=" d-flex justify-content-center">
        <div className="col-11 cardshow float-end mt-4">
          {filteredCourse.length > 0 ? (
            filteredCourse.map((item, index) => (
              <Card
                className="ms-3  mt-3 Coursecard bg-gradient "
                style={{ width: "18rem" }}
              >
                <Card.Header className="text-white ">Course</Card.Header>
                <Card.Body className="text-white Coursecard ">
                  <Card.Title className="Coursecard p-3">
                    {item.Title}
                  </Card.Title>
                  <Card.Text className="Coursecard description p-3">
                    {item.Description}
                  </Card.Text>
                  <Card.Text className="Coursecard p-2">
                    Author : {item.Author}
                  </Card.Text>
                  <div className="Coursecard p-2  d-flex justify-content-between">
                    <div>
                      {item.isvisible ? (
                        <Link
                          className="btn btn-light"
                          onClick={() => makevisible(item._id)}
                        >
                          <BsFillEyeFill></BsFillEyeFill>
                        </Link>
                      ) : (
                        <Link
                          className="btn btn-light"
                          onClick={() =>
                            handleVisible(item._id, item.Title, item.Author,item.userID)
                          }
                        >
                          <BsEyeSlashFill></BsEyeSlashFill>
                        </Link>
                      )}
                    </div>
                    <div>
                      <button className="btn btn-dark bg-gradient"></button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            ))
          ) : (
            <div className=" notfound  ">
              <div className=" text-light float-end ms-5">
                {" "}
                <h3>Not Found......!</h3>{" "}
              </div>
              {/* <div className=""><Loading Title="Loading"></Loading></div> */}
              {/* <div className=" text-light    "> <h3>Not Found......!</h3> </div> */}
              <div className="">
                <Loading Title="Loading"></Loading>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CourseAManage;
