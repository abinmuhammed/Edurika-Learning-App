import React from 'react'
import { BsSearch } from "react-icons/bs";
import styleshere from '../Mentor/mentordetails.module.css'
import { useState } from 'react';
import axios from 'axios';
import { BASEURL } from '../../Constants/Constants';
import profile from "../../../images/Elon musk.png";
import Loading from '../../Loading/Loading';
import { useEffect } from 'react';
import { CiCircleMore } from "react-icons/ci";
import Dropdown from "react-bootstrap/Dropdown";
import { BiBlock } from "react-icons/bi";
// import { Pagination } from 'react-bootstrap';
import Pagination from '../../pagination/Pagination';
import { useRef } from 'react';



function MentorDetails() {

const [mentors,setMentors]=useState("")
const[isActive,setisActive]=useState(true)
const [pagecount,setPagecount]=useState(1)
const currentPage=useRef()



useEffect(() => {
  currentPage.current = 1;
  getAllusers()

}, [isActive])

const getAllusers=async()=>{
try {
    await axios.get(`${BASEURL}/mentors?page=${currentPage?.current}&limit=4`).then((res)=>{
      
      console.log(res.data.result);
      setPagecount(res.data.pagecount)
      setMentors(res.data.result)
        
    })
} catch (error) {
    console.log(error);
}
}

const BlockMentor = (mentorId) => {
    axios.put(BASEURL + `BlockMentor/${mentorId}`).then((response) => {
      setisActive(!isActive);
    });
  };
  const UnBlocMentor = (mentorId) => {
    console.log(mentorId);
    axios.put(BASEURL + `UnblockMentor/${mentorId}`).then((response) => {
      setisActive(!isActive);
    });
  };

  const handlePageClick=(e)=>{
  currentPage.current=e.selected+1
  console.log(currentPage.current);
  getAllusers()
  }


  return (
    <>
    
    <div className="HeadDiv rounded-4   d-flex justify-content-center   p-lg-3">
        <h2 className="text-light">Mentor Management</h2>
      </div>
      <div className=" d-flex justify-content-lg-between ps-lg-5 pe-lg-5">
        <div className="d-flex  flex-row ms-lg-5 mt-3">
         
          <div className="ms-5 btn btn-dark disable bg-gradient">Mentors</div>
        </div>
        <div className="me-5 mt-3">
          <form action="">
            <input
              className="me-1 rounded-2 bg-dark bg-gradient"
              type="search"
              placeholder=" Search here"
              name=""
              id=""
            />
            <button type="button" className="btn me-lg-3 btn-dark bg-gradient">
              <BsSearch></BsSearch>
            </button>
          </form>
        </div>
      </div>

      <div className="d-flex justify-content-center " >
        <div className={[styleshere.courses, " p-5"].join(" ")}>
          {mentors.length > 0 ? (
            mentors.map((item, index) => (
              <div className={styleshere.course}>
                <img className="col-3 " src={profile} alt="" />
                <h6 className="m-1"> {item.FirstName}</h6>
                <p>{item.Email}</p>
                <Dropdown>
                  <Dropdown.Toggle
                    variant="success"
                    className="bg-dark bg-gradinet "
                    id="dropdown-basic"
                  >
                    <CiCircleMore></CiCircleMore> Manage
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="bg-dark bg-gradient ">
                    {item.isActive ? (
                      <Dropdown.Item
                        style={{ backgroundColor: "red", color: "white" }}
                        className="bg-gradient"
                        onClick={() => BlockMentor(item._id)}
                      >
                        Block <BiBlock></BiBlock>
                      </Dropdown.Item>
                    ) : (
                      <Dropdown.Item
                        style={{ backgroundColor: "green", color: "white" }}
                        className="bg-gradient"
                        onClick={() => UnBlocMentor(item._id)}
                      >
                        UnBlock
                      </Dropdown.Item>
                    )}

                    <Dropdown.Item
                      style={{ color: "white" }}
                      className="bg-gradient"
                    >
                      Mentor Details
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            ))
          ) : (
            <Loading></Loading>
          )}
        </div>
      </div>

      <Pagination handlePageClick={handlePageClick}  pagecount={pagecount} ></Pagination>

    </>
  )
}

export default MentorDetails