import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FaUserGraduate } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import logo from "../../../images/Group 4.png";

function AdminNavBar() {
  const Navigate = useNavigate();
  const auth = localStorage.getItem("ADMIN");
  const textcolor = {
    color: "rgb(255, 255, 255,0.55)",
  };

  const handlelogout = () => {
    localStorage.clear("ADMIN");
    Navigate("/admin/AdminLogin");
  };

  return (
    <>
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
                  {" "}
                  <Nav.Link onClick={()=>Navigate('/admin/adminhome')} >Home</Nav.Link>
                  <NavDropdown
                    title="App Mangement"
                    className="drop"
                    id="collasible-nav-dropdown"
                  >
                    <NavDropdown.Item>
                      <Link
                        to="/Admin/UserMangement"
                        className="text-decoration-none text-dark "
                        style={textcolor}
                      >
                        User Mangement
                      </Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                      <Link
                        to="/Admin/mentorMangement"
                        className="text-decoration-none text-dark "
                        style={textcolor}
                      >
                        Mentor Mangement
                      </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Link
                        to="/Admin/CourseManagement"
                        className="text-decoration-none text-dark "
                        style={textcolor}
                      >
                        Course Mangement
                      </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Link
                        to="/Admin/Categories"
                        className="text-decoration-none text-dark"
                        style={textcolor}
                      >
                        Category Management
                      </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Link
                        to=""
                        className="text-decoration-none text-dark "
                        style={textcolor}
                      >
                        Banner Mangement
                      </Link>
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                ""
              )}
              <>
                {auth ? (
                  <NavDropdown
                    title="Admin"
                    className="drop"
                    id="collasible-nav-dropdown"
                  >
                    <NavDropdown.Item href="#action/3.1">
                      <FaUserGraduate /> My profile
                    </NavDropdown.Item>

                    <NavDropdown.Item onClick={handlelogout}>
                      <TbLogout></TbLogout>Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  ""
                )}
              </>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default AdminNavBar;
