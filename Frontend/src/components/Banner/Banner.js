import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/esm/Container";
import {  Link } from "react-router-dom";
import Bannerpic from "../../images/Banner.png";
import mentorBanner from "../../images/mBanner.png";
import "./Banner.css";

function Banner({ Mentor }) {

  return (
    <div className="banner-container mb-4 mt-5 ">
      <div className="col-lg-9  Banner justifycontend center ">
        <div>
          <div>
            {Mentor ? (
              <Link to="/mentor/create-a-course"><img className="d-block w-100" src={mentorBanner}  /></Link>
            ) : (
              <img className="d-block w-100" src={Bannerpic}  />   )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
