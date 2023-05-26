import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";

const TestCard = ({ data }) => {
  const Navigate = useNavigate();

  return (
    <div className="col-2 m-5 card-enroll rounded-5 ">
      <div className="card card-cascade rounded-4 wider cardbg text-white">
        <div className="view view-cascade overlay">
          <img
            className="card-img-top"
            src="https://mdbootstrap.com/img/Photos/Others/photo6.webp"
            alt="Card image cap"
          />
          <a href="#!">
            <div className="mask rgba-white-slight" />
          </a>
        </div>

        <div className="card-body  card-body-cascade  pb-0">
          <h3 className="card-title">
            <strong className="text-light  ">{data?.Title}</strong>
          </h3>

          <p className="card-text pb-0 ">{data.Description} </p>
          <div>
 
            <p style={{ fontSize: "13px" }} className="mb-1">{data.Author}</p>
          
          <div className=" justify-content-start d-flex mb-1">
            <AiFillStar style={{ color: "orange" }}></AiFillStar>
            <AiFillStar style={{ color: "orange" }}></AiFillStar>
            <AiFillStar style={{ color: "orange" }}></AiFillStar>
            <AiFillStar></AiFillStar>
            <AiFillStar></AiFillStar>
          </div>

          <div>
            <p className="mb-1" style={{"fontSize":"18px"}}>$0.00</p>
          </div>
          </div>
          <div className="card-footer text-muted text-center mt-4">
            <button
              onClick={() => Navigate(`/user/watchVideo/${data._id}`)}
              className="btn btn-enroll bg-gradient btn-dark"
            >
              Enroll
            </button>
          </div>
        </div>
      </div>
      {/* Card Regular */}
    </div>
  );
};

export default TestCard;
