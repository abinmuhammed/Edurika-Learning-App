import React, { useState } from "react";
import "./Signup.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../../images/Group 15.png";
import { BASEURL } from "../Constants/Constants";

function Signup() {
  const [FirstName, setFirstName] = useState("");
  const [firstNameValid, setFirstNameValid] = useState(true);
  const [LastName, setLastName] = useState("");
  const [LastNameValid, setLastNameValid] = useState(true);
  const [Email, setEmail] = useState("");
  const [Emailvalid, setEmailvalid] = useState(true);
  const [Password, setPassword] = useState("");
  const [Mobile, setMobile] = useState("");
  const [mobilevalid, setmobilevalid] = useState(true);
 const [Error,SetError]=useState(true)
 const [success,setsuccess]=useState("")

 

  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const err = {
    color: "red",
  };
  const succ = {
    color: "Green",
  };


  const Navigate = useNavigate();

  const handlefirstname = (e) => {
    const pattern = /^[a-zA-Z][a-zA-Z0-9_]*$/;
    const input = e.target.value;
    setFirstName(input);
    setFirstNameValid(pattern.test(input));
  };

  const handlesecondName = (e) => {
    const pattern = /^[a-zA-Z][a-zA-Z0-9_]*$/;
    const input = e.target.value;
    setLastName(input);
    setLastNameValid(pattern.test(input));
  };
  const emailchange = (e) => {
    const input = e.target.value;
    setEmail(input);
    const Emailformat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailvalid(Emailformat.test(input));
  };

  const mobilenumberchange = (e) => {
    const input = e.target.value;
    setMobile(input);
    const pattern = /^[1-9]\d{9}$/;
    setmobilevalid(pattern.test(input));
  };

  const passwordchange = (e) => {
    setPassword(e.target.value);

  };
  const Handledata = async (e) => {
    e.preventDefault();
    if (Password !== confirmPassword) {
      setPasswordError("Passwords do not match !");
      return;
    }
    if (Password.length<4) {
      setPasswordError("Passwords must be more than 4 characters !");
      return;
    }

    if (!FirstName || !LastName || !Email || !Password || !Mobile) {
      SetError(false);
      return false;
    }
    if (!firstNameValid || !LastNameValid || !Emailvalid) {
      return;
    }

    let result = await fetch(`${BASEURL}/SignupAsStudent`, {
      method: "post",
      body: JSON.stringify({ FirstName, LastName, Email, Mobile, Password }),
      headers: {
        "content-Type": "application/json",
      },
    });
    result = await result.json();
    
    if(result.Email){
      setsuccess(result.Email)
    }

    // Navigate("/login");
  };

  return (
    <div className="SignupDiv">
      <div className="imageDiv">
        <img className="col-lg-8" src={logo} alt="Your Image" />
      </div>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            value={FirstName}
            placeholder="First Name"
            onChange={handlefirstname}
          />
          {!firstNameValid && (
            <div style={err}>
              <p>Enter a valid Name !</p>
            </div>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            value={LastName}
            placeholder="Last Name"
            onChange={handlesecondName}
          />
          <Form.Text className="text-muted">
            {!LastNameValid && (
              <div style={err}>
                <p>Enter a valid Name !</p>
              </div>
            )}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={Email}
            onChange={emailchange}
            placeholder="Enter Email"
          />
          {!Emailvalid && !Error &&(
            <div style={err}>
              <p>Enter a valid Email !</p>
            </div>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassw">
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control
            type="text"
            value={Mobile}
            placeholder="Mobile Number"
            onChange={mobilenumberchange}
          />
          <Form.Text className="text-muted">
            {!mobilevalid && (
              <div style={err}>
                <p>Enter a valid Mobile Number !</p>
              </div>
            )}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={Password}
            onChange={passwordchange}
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
          />
          {passwordError && <div style={err}>{passwordError}</div>}
        </Form.Group>

     { success ?   <p  style={succ}>Login SuccessFull </p> :  <Button variant="primary" type="submit" onClick={Handledata}>
          Submit
        </Button>}

        {success ? <Link className="m-2 Alreadyuser" to="/user/login">
          Login Now
        </Link>:<Link className="m-2 Alreadyuser" to="/user/login">
          Already A user ?
        </Link>}

        
      </Form>
    </div>
  );
}

export default Signup;
