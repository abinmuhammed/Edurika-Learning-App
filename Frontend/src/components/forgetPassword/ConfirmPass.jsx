import axios from "axios";
import React from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { BASEURL } from "../Constants/Constants";
import { Toast } from "../sweetalert/sweetalert2";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function ConfirmPass({ Email }) {
  const [Password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const[refresh,setRefresh]=useState(true)
  const passwordchange = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    
  }, [refresh])
  const Navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Password !== confirmPassword) {
      setPasswordError("Passwords do not match !");
      return;
    }
    console.log(Password, confirmPassword);
   

    await axios.post(`${BASEURL}/passwordChange`,{
      "Email":Email,
      "password":Password
    }).then((res) => {
      Toast.fire({
        icon: "success",
        title: "Password updated Succesfully",
      });
     Navigate(0)
    });
  };
  const err = {
    color: "red",
  };

  return (
    <>
      <div>
        <Form>
          <Form.Group className="mb-3">
            <p className="labeler">Password</p>
            <Form.Control
              type="password"
              value={Password}
              onChange={passwordchange}
              placeholder="Password"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="labeler">Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
            />
            {passwordError && (
              <div className="labeler" style={err}>
                {passwordError}
              </div>
            )}
          </Form.Group>
          <button className="btn btn-dark bg-gradient" onClick={handleSubmit}>
            Submit
          </button>
        </Form>
      </div>
    </>
  );
}

export default ConfirmPass;
