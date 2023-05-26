import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import Login from "../Login/Login";
import logo from "../../images/Group 4.png";
import { FaUserGraduate } from "react-icons/fa";
import message from "../../images/messsage.png";
import notification from "../../images/notification.png";
import MentorNotification from '../Notification/MentorNotification'
import { TbLogout } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import "../Navbar/Navbar.css";
import { useState } from "react";

function MnAbar() {
  const auth = localStorage.getItem("Mentor");
  const Navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [count, setNotcount] = useState(0);
  const [countRefresh, setCountRefresh] = useState(true);

  const logout = () => {
    localStorage.clear("Mentor", "MentorID", "token");
    Navigate("/mentor");
  };

  const handleShow = () => {
    setShow(!show);
  }


  return (
    <Navbar collapseOnSelect expand="lg" variant="dark">
      <Container>
        <Navbar.Brand href="#home" className="text-header">
          <img src={logo} className="logopic" alt="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className="navbar-links" id="responsive-navbar-nav">
          <Nav>
            {auth ? (
              <>
                <Nav.Link onClick={() => Navigate("/mentor/chat")}>
                  <img className="notification" src={message} alt="" />
                </Nav.Link>
                <Nav.Link>
                  <div>
                    <img
                      className="notification"
                      onClick={handleShow}
                      src={notification}
                      alt=""
                    />
                    {/* <span className="position-absolute opacity-75 hovering-zoom noty">
                      {count}
                    </span> */}
                  </div>
                  <MentorNotification
                    show={show}
                    handleShow={handleShow}
                    countrefresh={setCountRefresh}
                    refresh={countRefresh}
                  />
                </Nav.Link>
              </>
            ) : (
              ""
            )}

            <Nav.Link href="#deets">Home</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Courses
            </Nav.Link>
            {auth ? (
              <>
                <NavDropdown
                  title="Mentor"
                  className="drop"
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
                {" "}
                <Nav.Link>
                  <Link className="navhead" to="/user/login">
                    Login
                  </Link>{" "}
                </Nav.Link>
                <Nav.Link className="hlo">
                  <Link className="navhead" to="/mentor/Mentorlogin">
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

export default MnAbar;
