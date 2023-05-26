import React from "react";
import logo from "../../images/Group 4.png";
import "./Landing.css";

function LoadingPage() {
  return (
    <div className="loading-page">
      <img src={logo} alt="Logo" className="main-logo" />
      <h2></h2>
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only"></span>
      </div>
    </div>
  );
}

export default LoadingPage;