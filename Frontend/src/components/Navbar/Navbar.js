import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import Login from "../Login/Login";
import logo from "../../images/Group 4.png";
import { FaUserGraduate } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Navbar.css";
import message from "../../images/messsage.png";
import notification from "../../images/notification.png";
import { useEffect, useRef, useState } from "react";
import { autoBatchEnhancer } from "@reduxjs/toolkit";
import axios from "axios";
import { BASEURL } from "../Constants/Constants";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/wList";
import Notification from "../Notification/Notification";
import { socket } from "../Constants/Constants";

function CollapsibleExample() {
  const [show, setShow] = useState(false);
  const [count,setNotcount]=useState(0)
  const [countRefresh,setCountRefresh]=useState(true)

  const userDetails = useSelector((state) => state.list);


  const handleShow = () => {
    setShow(!show);
    axios.post(`${BASEURL}/count`).then((res)=>{
      setCountRefresh(!countRefresh)
    })
  };
  socket.on("get_course_disabled_notify",(data)=>{
    setCountRefresh(!countRefresh)
  })
  

 useEffect(() => {
 getNotificationCount()
  }, [countRefresh])
  
  
 const getNotificationCount=async()=>{
 await axios.get(`${BASEURL}/count`).then((res)=>{
  setNotcount(res.data.msg);
 })
 }



  const name =
    userDetails && userDetails.userData && userDetails.userData.FirstName
      ? userDetails.userData.FirstName
      : "user";

  let auth = localStorage.getItem("user");
  auth = auth?.replace(/"/g, "");

  const Navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`${BASEURL}/user?Email=${auth}`).then((res) => {
      console.log(res.data);
      dispatch(login(res.data));
    });
  }, []);

  const logout = () => {
    localStorage.clear();
    Navigate("/");
  };

  return (
    <Navbar collapseOnSelect expand="lg" variant="dark">
      <Container className="">
        <Navbar.Brand href="#home" className="text-header ">
          <img className="logopic" src={logo} alt="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className="navbar-links" id="responsive-navbar-nav">
          <Nav>
            {auth ? (
              <>
                <Nav.Link onClick={() => Navigate("/user/chat")}>
                  <img className="notification" src={message} alt="" />
                </Nav.Link>
                <Nav.Link>
                  <div className="position-relative">
                    <img
                      className="notification"
                      onClick={handleShow}
                      src={notification}
                      alt=""
                    />
                    <span className="position-absolute opacity-75 hovering-zoom noty">
                      {count}
                    </span>
                  </div>
                  <Notification show={show} handleShow={handleShow}  countrefresh={setCountRefresh} refresh={countRefresh}/>
                </Nav.Link>
              </>
            ) : (
              ""
            )}

            <Nav.Link
              onClick={() => Navigate("/user/home")}
              className="fw-bold lead"
            >
              Home
            </Nav.Link>
            <Nav.Link
              eventKey={2}
              onClick={() => Navigate("/user/Courses-User")}
              className="fw-bold lead"
            >
              Courses
            </Nav.Link>
            {auth ? (
              <>
                <NavDropdown
                  title={name}
                  className="drop fw-bold"
                  id="collasible-nav-dropdown"
                >
                  <NavDropdown.Item href="#action/3.1">
                    <FaUserGraduate /> My profile
                  </NavDropdown.Item>

                  <NavDropdown.Item onClick={logout}>
                    {" "}
                    <TbLogout></TbLogout>Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link>
                  <Link className="navhead fw-bold " to="/user/login">
                    Login
                  </Link>
                </Nav.Link>
                <Nav.Link className="hlo">
                  <Link className="navhead fw-bold " to="/mentor/Mentorlogin">
                    Login As Mentor
                  </Link>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;
