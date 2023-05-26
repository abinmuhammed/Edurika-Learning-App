import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { BASEURL } from "../Constants/Constants";
import { Toast } from "../sweetalert/sweetalert2";
import ConfirmPass from "./ConfirmPass";

function EnterOtp({ Email }) {
  const [otp, setOtp] = useState("");
  const [resetPass, setResetPass] = useState(false);

  useEffect(() => {}, [resetPass]);

  const handleOtp = async (e) => {
    e.preventDefault();
    await axios
      .get(`${BASEURL}/resetPassword?Token=${otp}&Email=${Email}`)
      .then((res) => {
        console.log(res);
        if (res?.data?.invalidOtp) {
        
        Toast.fire({
            icon: "error",
            title: res.data.msg,
          });
        } else{
            setResetPass(true)
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        alert(err.response.data.msg);
        window.location.reload();
        Toast.fire({
          icon: "error",
          title: err.response.data.msg,
        });
      });
  };
  return (
    <>
      {resetPass ? (
        <h2><ConfirmPass Email={Email}  ></ConfirmPass></h2>
      ) : (
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>
            OTP <span style={{ color: "red" }}>*</span>
          </Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter Your OTP"
          />
          <button className="btn btn-dark m-2  bg-gradient" onClick={handleOtp}>
            Submit
          </button>
        </Form.Group>
      )}
    </>
  );
}

export default EnterOtp;
