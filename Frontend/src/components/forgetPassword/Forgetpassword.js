import React, { useEffect } from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { BASEURL } from "../Constants/Constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EnterOtp from "./EnterOtp";
import { Toast } from "../sweetalert/sweetalert2";
function Forgetpassword() {
  const [validate, setValidate] = useState(true);
  const [Email, SetEmail] = useState("");
  const [otp, setOtp] = useState(false);
  const Navigate = useNavigate();

useEffect(() => {
 
}, [otp])


  const handleEmail = (e) => {
    const input = e.target.value;
    SetEmail(input);
    const Emailformat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setValidate(Emailformat.test(input));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(Email);

    // if (validate) {
    //   return false;
    // }
    await axios
      .post(`${BASEURL}/forgetmail`, { Email: Email })
      .then((res) => {
        console.log(res);
        setOtp(true);
        // Navigate("/user/reset-password")
      })
      .catch((err) => {
        console.log(err);
        Toast.fire({
          icon: "error",
          title: err.response.data.msg,
        });
      });
  };

  return (
    <Form>
      {otp ? (
        <EnterOtp Email={Email}></EnterOtp>
      ) : (
        <>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>
              Email address <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="email"
              onChange={handleEmail}
              placeholder="name@example.com"
            />
            {!validate ? (
              <p style={{ color: "red" }}> Enter valid mail-id</p>
            ) : (
              ""
            )}
          </Form.Group>
          <button onClick={handleSubmit} className="btn btn-dark bg-gradient">
            Submit Mail
          </button>
        </>
      )}
    </Form>
  );
}

export default Forgetpassword;
