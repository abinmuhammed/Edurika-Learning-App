import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { Link } from "react-router-dom";
import "./AddCourse.css";
import { AiFillDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import Toast from "../sweetalert/sweetalert2";
import { BASEURL } from "../Constants/Constants";
import { showdelete } from "../sweetalert/Deleteswal";
import { socket } from "../Constants/Constants";

function AddCourse() {
  const [Title, setTitle] = useState("");
  const [TitleValid, setTitleVAlid] = useState(true);

  const [Description, setDescription] = useState("");
  const [desValid, setdesValid] = useState(true);
  const [Author, setAuthor] = useState("");
  const [AuthorValid, setAuthorVAlid] = useState(true);
  const [Category, setCategory] = useState("");
  const [Course, setCourse] = useState([]);
  const [Clist, setClist] = useState([]);
  let auth = localStorage.getItem("MentorID");
  const Navigate = useNavigate();
  const [refresh, setrefresh] = useState(true);
  const [lastFour, setlastFour] = useState([]);

  useEffect(() => {
    GetCourses();
    GetCategories();
  }, [refresh]);

  const GetCategories = () => {
    axios.get(`${BASEURL}/Getcategories`).then((response) => {
      setClist(response.data.res);
    });
  };

  const GetCourses = async () => {
    auth = auth.replace('"', "");
    auth = auth.replace('"', "");

    const url = `${BASEURL}/GetallCourses?userID=${auth}`;

    const result = await axios(url, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });

    setCourse(result.data.course.slice(-3));
    // setlastFour(setCourse.slice(-4))

  };

  const handleTitle = (e) => {
    let input = e.target.value;

    let checkArray = input.split(" ");
    if (checkArray.length > 3) {
      setTitleVAlid(false);
    } else {
      setTitleVAlid(true);
    }
    setTitle(input);
  };

  const handledescriptiion = (e) => {
    let input = e.target.value;
    let checkArray = input.split(" ");
    checkArray.length < 14 ? setdesValid(false) : setdesValid(true);
    setDescription(input);
  };

  const handleAuthor = (e) => {
    let input = e.target.value;
    setAuthor(input);
    input == "" ? setAuthorVAlid(false) : setAuthorVAlid(true);
  };

  const handleCategory = (e) => {
    let input = e.target.value;
    setCategory(input);
  };

  const handledata = async (e) => {
    // e.prevent.Default()

    if ((!Title, !Author, !Description, !Category)) {
      return;
    }

    if ((!TitleValid, !desValid, !AuthorValid)) {
      return;
    }

    auth = auth.replace(/"/g, "");
    const userID = auth;

    let result = await fetch(`${BASEURL}/CreateCourse`, {
      method: "post",
      body: JSON.stringify({ Title, Description, Author, Category, userID }),
      headers: {
        "content-Type": "application/json",
      },
    });

    if (result) {
      setrefresh(!refresh);
      Navigate("/mentor/create-a-course");

      socket.emit("New_course_added",{Title,Author})

      const notificationResult = await axios.post(`${BASEURL}/notification`, {
        notification:
          `Recently,${Title} course by ${Author} has been Added ,check it out now for free `,
          userType:"student"
      });
    } else {
      alert("something Wrong");
    }
  };

  //<............ Delete alert.............>

  const Handledelete = (courseID) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    showdelete().then((result) => {
      if (result.isConfirmed) {
        axios
          .put(BASEURL + `delete/${courseID}`)
          .then((response) => {
            swalWithBootstrapButtons.fire(
              "Deleted!",
              "Your file has been deleted.",
              "success"
            );
            setrefresh(!refresh);
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          "Cancelled",
          "Your file is safe :)",
          "error"
        );
      }
    });
  };

  // <..........**.......>

  return (
    <>
      <div className=" m-5 d-flex justify-content-center">
        <div className="col-5 float-start">
          <div className="mb-3">
            <h2 className="text-light"> Start a new Course :-</h2>
          </div>
          <Form>
            <Form.Group className="mb-3" controlId="forasicEmail">
              <Form.Label>Course Title</Form.Label>
              <Form.Control
                type="text"
                value={Title}
                onChange={handleTitle}
                placeholder="Course Title"
              />
              {!TitleValid && (
                <div style={{ color: "red" }}>
                  <p>Title cannot be more than 3 Words...!</p>
                </div>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassw">
              <Form.Label>Decription</Form.Label>
              <Form.Control
                type="text"
                onChange={handledescriptiion}
                value={Description}
                placeholder="Desription"
              />
              {!desValid && (
                <div style={{ color: "red" }}>
                  <p>description must be more than 14 Words...!</p>
                </div>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="foasicPassword">
              <Form.Label> Author Name </Form.Label>
              <Form.Control
                type="text"
                value={Author}
                onChange={handleAuthor}
                placeholder=" Author Name"
              />
              {!AuthorValid && (
                <div style={{ color: "red" }}>
                  <p>Name field can't be empty..!</p>
                </div>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select value={Category} onChange={handleCategory}>
                {Clist.length > 0 ? (
                  <>
                    <option selected>Select a category</option>
                    {Clist.map((item, index) => (
                      <option>{item.CategoryName}</option>
                    ))}
                  </>
                ) : (
                  <option>Loading..</option>
                )}
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="button" onClick={handledata}>
              Submit
            </Button>
          </Form>
        </div>
      </div>
      <div className="col-3 bg-danger ">
        <h3 className="float-end text-light">Recent uploads</h3>
      </div>
      
      <div className="col-12 d-flex justify-content-center course-div " >
        
      {Course.length > 0
            ? Course.map((item, index) => (
                <Card
                  className="ms-4 ms-lg-2  mt-3 Coursecard bg-gradient "
                  style={{ width: "17rem" }}
                >
                  <Card.Header className="text-white ">Your Course</Card.Header>
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
                        <Link
                          to={"/mentor/Add-a-lesson/" + item._id}
                          className="btn btn-dark"
                        >
                          ADD +
                        </Link>
                      </div>
                      <div>
                        <button
                          className="btn btn-dark bg-gradient"
                          onClick={() => Handledelete(item._id)}
                        >
                          <AiFillDelete></AiFillDelete>
                        </button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              ))
            : <h3 className="text-light font-monospace opacity-50">Starting Adding Courses for free</h3>}
        </div>
        

    </>
  );
}

export default AddCourse;
