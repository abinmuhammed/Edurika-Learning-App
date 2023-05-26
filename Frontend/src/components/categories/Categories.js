import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import artlogo from "../../images/art-category.png";
import styleshere from "./Categories.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASEURL } from "../Constants/Constants";
function Categories() {
const Navigate=useNavigate()
  const [Clist,setClist]=useState([]) 
  useEffect(() => {
    getCategories()
  
    
  }, [])
  
  
  const getCategories = () => {
    axios.get(`${BASEURL}/Getcategories`).then((response) => {
      setClist(response.data.res);
    });
  };

  return (
    <>
      <div className="text-white ms-5">
        <h3 className="ms-5 mt-2">Our Courses</h3>
      </div>
      <div
        className={[styleshere.courses, " align-content-center p-5"].join(" ")}
      >

        {Clist.length>0?Clist.map((item,index)=>(
          <div onClick={()=>Navigate(`/user/Courses/${item._id}`)} 
          className={styleshere.course}>
          <img className="col-3 " src={item.Image} alt="" />
          <h6 className="m-1">{item.CategoryName}</h6>
        </div>

        )):""}
        
        
      </div>
    </>
  );
}

export default Categories;
