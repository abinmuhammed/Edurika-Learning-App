import React from "react";
import imgmentor from "../../../images/Group 20.png";
import { useNavigate } from "react-router-dom";

function Mentorship() {
 const Navigate=useNavigate()
  return (
    <div className="d-flex justify-content-center">
      <div className="col-4 bg-gradient rounded-3 p-4  pe-0">
        <img className="col-8  ms-5" src={imgmentor} alt="MentorImg" />
      </div>
      <div className="col-5  d-flex justify-content-center p-5 text-light rounded-3 " style={{ "background": "rgb(111, 34, 50)","background": "linear-gradient(217deg, rgba(111, 34, 50, 1) 1%, rgba(0, 0, 0, 1) 98%)",'fontFamily':"unset"}} >
        <div className="col-7">
          <h3>Become a Mentor</h3>
          <p className="" style={{"fontFamily":"sans-serif","fontWeight":"bolder"}}>
            Instructors from around the world teach millions of students on
            Edurika <br />
            We provide the tools and skills to teach what you love.
          </p>
          <button className="btn btn-dark bg-gradient" onClick={()=>Navigate('/mentor/MentorSignup')}>Join now </button>
        </div>
      </div>
    </div>
  );
}

export default Mentorship;
