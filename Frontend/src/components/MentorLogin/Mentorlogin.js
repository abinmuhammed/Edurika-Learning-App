import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/Group 20.png";
import { BASEURL } from "../Constants/Constants";

function Mentorlogin() {
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const Emailformat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email format
  const Navigate = useNavigate();
  const [Emailvalid, setEmailvalid] = useState(true);
  const [error,setError]=useState(true)

  const err = {
    color: "red",
  };
  const LoginASmentor = async (e) => {
    e.preventDefault();

    if ((!Email, !password)) {
      setError(true);
      return false;
    }
    if(!Emailvalid){
      return
    }

    let result = await fetch(`${BASEURL}/LoginasMentor`, {
      method: "post",
      body: JSON.stringify({ Email, password }),
      headers: {
        "content-Type": "application/json",
      },
    });
    result = await result.json();
 
    if (result.accesstoken) {
      localStorage.setItem("Mentor", JSON.stringify(result.firstName));
      localStorage.setItem("MentorID", JSON.stringify(result.userID));

      localStorage.setItem("token", JSON.stringify(result.accesstoken));

      Navigate("/mentor/Home");
    } else {
      setAuthError(result.error);
     
    }
  };

  const handleMail = (e) => {
    const input = e.target.value;
    setEmail(input);

    setEmailvalid(Emailformat.test(input));
  };

  return (
    <div className="LoginDiv">
      <div className="imageDiv">
        <img className="col-lg-9" src={logo} alt="Your Image" />
      </div>

      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={Email}
            onChange={handleMail}
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
            {!Emailvalid&&(
              <div>
                <p style={err}>Enter a valid Mail-Id</p>
              </div>
            )}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <p style={err}>{authError}</p>
        <Button variant="primary" type="button" onClick={LoginASmentor}>
          Login As Mentor
        </Button>

        <Link className="m-2 Alreadyuser" to="/mentor/MentorSignup">
          Sign Up as Mentor ?
        </Link>
      </Form>
    </div>
  );
}

export default Mentorlogin;
