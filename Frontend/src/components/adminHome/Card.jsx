import React from "react";
import '../adminHome/adminHome.css'
import Counter from "../../utils/Counter";

function Card({data,value}) {
  return (
    <>
      <div className="align-content-center  dashCard p-3 col-3">
        <h4 className="text-light" >{data?data:"Weekly Sales"}</h4>
        <div className="d-flex">
         <h3>00</h3><h3><Counter value={value?value:2146}></Counter></h3>
        </div>
        <span>Increased by 60%</span>
      </div>
    </>
  );
}

export default Card;
