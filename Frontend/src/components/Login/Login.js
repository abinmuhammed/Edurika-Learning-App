import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Login.css";
import logo from "../../images/Group 15.png";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Forgetpassword from "../forgetPassword/Forgetpassword";
import { BASEURL } from "../Constants/Constants";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/wList";
import { socket } from "../Constants/Constants";
import { io } from "socket.io-client";
import { sweetNote } from "../sweetalert/sweetalert2";
function Login() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Error, setError] = useState(true);
  const Emailformat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email format
  const Navigate = useNavigate();
  const [showpassword, setshowpassword] = useState(false);
  const [AuthError, setAuthError] = useState("");
  const [forgetPassword, setForgetpass] = useState(true);
  const dispatch = useDispatch();


  useEffect(() => {
    socket.connect();

    socket.on("get_course_disabled_notify", (data) => {
      console.log(data);
      sweetNote(data.text, "error");
    });
  }, []);

  useEffect(() => {
    console.log(forgetPassword);
  }, [forgetPassword]);

  const togglePassword = () => {
    setshowpassword(!showpassword);
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      Navigate("/user/home");
    }
  }, []);

  const err = {
    color: "red",
  };
  const handledata = async (e) => {
    e.preventDefault();

    if (!Email || !Password) {
      setError(false);
      return false;
    }
    // const patternMail=

    let result = await fetch(`${BASEURL}/LoginAsStudent`, {
      method: "post",
      body: JSON.stringify({ Email, Password }),
      headers: {
        "content-Type": "application/json",
      },
    });
    result = await result.json();

    if (result.accesstoken) {
      console.log(result);
      dispatch(login(result));

      localStorage.setItem("user", JSON.stringify(result.Email));
      localStorage.setItem("userId", JSON.stringify(result.id));
      Navigate("/user/home");
    } else {
      setAuthError(result.message);
      console.log(result.message);
    }
  };
  const handleForget = () => {
    setForgetpass(false);
  };

  return (
    <div className="LoginDiv">
      <div className="imageDiv">
        <img className="col-lg-9" src={logo} alt="Your Image" />
      </div>

      {forgetPassword ? (
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
            <Form.Text className="text-muted">
              {(Error && !Email) ||
                (!Emailformat.test(Email) && (
                  <span style={err} className="invalid">
                    Enter valid Mail !
                  </span>
                ))}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>

            <Form.Control
              type={showpassword ? "text" : "password"}
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            {AuthError ? (
              <div>
                <p style={err}> {AuthError} </p>
              </div>
            ) : (
              <div></div>
            )}
            <p className="m-1 forget" onClick={handleForget}>
              Forget Password ..?
            </p>
          </Form.Group>
          {Password ? (
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                checked={showpassword}
                onChange={togglePassword}
                label="show password"
              />
            </Form.Group>
          ) : (
            <Form.Group></Form.Group>
          )}

          <Button variant="primary" type="button" onClick={handledata}>
            Submit
          </Button>
          <Link to="/user/signup" className="Alreadyuser">
            {" "}
            Sign up Now ?{" "}
          </Link>
        </Form>
      ) : (
        <Forgetpassword></Forgetpassword>
      )}
    </div>
  );
}

export default Login;
