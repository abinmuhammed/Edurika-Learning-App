import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from '../../images/Group 20.png'
import { BASEURL } from "../Constants/Constants";

function MentorSignup() {
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
  const Navigate=useNavigate()


  const err = {
    color: "red",
  };
  const succ = {
    color: "Green",
  };
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


const Mentordata = async(e)=>{
  
// e.PreventDefault()


if (!FirstName || !LastName || !Email || !Password || !Mobile) {
  SetError(false);
  return false;
}

if (!firstNameValid || !LastNameValid || !Emailvalid||!mobilevalid) {
  return;
}

let result = await fetch(`${BASEURL}/signupAsMentor`, {
  method: "post",
  body: JSON.stringify({ FirstName, LastName, Email, Mobile, Password }),
  headers: {
    "content-Type": "application/json",
  },
});
result = await result.json();


Navigate("mentor/MentorLogin");
};
 


  return (
    <div className="SignupDiv">
    <div className="imageDiv">
      <img className="col-lg-8" src={logo} alt="Your Image" />
    </div>
    <Form>
      <Form.Group className="mb-3" controlId="formBasicPassrd">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" value={FirstName} onChange={handlefirstname} placeholder="First Name" />
        {!firstNameValid && (
            <div style={err}>
              <p>Enter a valid Name !</p>
            </div>
          )}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasi">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" value={LastName} onChange={handlesecondName} placeholder="Last Name" />
        {!LastNameValid && (
              <div style={err}>
                <p>Enter a valid Name !</p>
              </div>
            )}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" value={Email} onChange={emailchange} placeholder="Enter Email" />
      
        {!Emailvalid && !Error &&(
            <div style={err}>
              <p>Enter a valid Email !</p>
            </div>
          )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassw">
        <Form.Label>Mobile Number</Form.Label>
        <Form.Control type="text" value={Mobile} onChange={mobilenumberchange} placeholder="Mobile Number" />
        {!mobilevalid && (
              <div style={err}>
                <p>Enter a valid Mobile Number !</p>
              </div>
            )}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasssword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" value={Password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>

      <Button variant="primary" type="button" onClick={Mentordata}>
        Submit
      </Button>
      
      <Link  className="m-2 Alreadyuser" to="/mentor/MentorLogin">
        Already a Mentor ?
      </Link>
    </Form>
  </div>
  )
}

export default MentorSignup