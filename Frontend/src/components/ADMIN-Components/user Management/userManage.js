import React, { useEffect } from "react";
import styleshere from "./usermanage.module.css";
import { AiOutlinePlusSquare } from "react-icons/ai";
import profile from "../../../images/Elon musk.png";
import Dropdown from "react-bootstrap/Dropdown";
import { CiCircleMore } from "react-icons/ci";
import { BASEURL } from "../../Constants/Constants";
import axios from "axios";
import { useState } from "react";
import Loading from "../../Loading/Loading";
import { BsSearch } from "react-icons/bs";
import { BiBlock } from "react-icons/bi";

import { useRef } from "react";
import Pagination from "../../pagination/Pagination";
import { sweetNote } from "../../sweetalert/sweetalert2";

function UserManage() {
  const [isActive, setisActive] = useState(true);
  const [limit, setlimit] = useState(5);
  const CurrentPage = useRef();
  const [pagecount, setPagecount] = useState(1);
  const [users, setusers] = useState([]);
  const [serachResult, setSearchResult] = useState([]);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    CurrentPage.current = 1;
    getAllUsers();
  }, [isActive, refresh]);

  const handlePageClick = (e) => {
    CurrentPage.current = e.selected + 1;
    getAllUsers();
  };

  const getAllUsers = async () => {
    await axios
      .get(BASEURL + `/users?page=${CurrentPage.current}&limit=${limit}`)
      .then((response) => {
        console.log(response.data);
        setPagecount(response.data.pagecount);

        setusers(response.data.results);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const Blocksuser = (userid) => {
    axios.put(BASEURL + `Blockuser/${userid}`).then((response) => {
      setisActive(!isActive);
    });
  };
  const UnBlockuser = (userid) => {
    axios.put(BASEURL + `Unblockuser/${userid}`).then((response) => {
      setisActive(!isActive);
    });
  };
  const handleSearch = async (e) => {
    const input = e.target.value;
    await axios.get(`${BASEURL}/SearchUser?searchTerm=${input}`).then((res) => {
      console.log(res.data.res);
      setusers(res.data.res);
      if (input&&(users.length<0)) {
        let note = "No users Found";
        sweetNote(note);
      }
      if (input === "") {
        setRefresh(!refresh);
      }
    });
  };

  return (
    <>
      <div className="HeadDiv rounded-4   d-flex justify-content-center   p-lg-3">
        <h2 className="text-light">User Management</h2>
      </div>

      <div className=" d-flex justify-content-lg-between ps-lg-5 pe-lg-5">
        <div className="d-flex  flex-row ms-lg-5 mt-3">
          <div className="ms-5 btn btn-dark bg-gradient">Students</div>
        </div>
        <div className="me-5 mt-3">
          <form action="">
            <input
              className="me-1 rounded-2 bg-dark bg-gradient"
              type="search"
              placeholder=" Search here"
              name=""
              id=""
              onChange={handleSearch}
            />
            <button type="button" className="btn me-lg-3 btn-dark bg-gradient">
              <BsSearch></BsSearch>
            </button>
          </form>
        </div>
      </div>
      <div className="d-flex justify-content-center ">
        <div className={[styleshere.courses, " p-5"].join(" ")}>
          {users.length > 0 ? (
            users.map((item, index) => (
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
                        onClick={() => Blocksuser(item._id)}
                      >
                        Block <BiBlock></BiBlock>
                      </Dropdown.Item>
                    ) : (
                      <Dropdown.Item
                        style={{ backgroundColor: "green", color: "white" }}
                        className="bg-gradient"
                        onClick={() => UnBlockuser(item._id)}
                      >
                        UnBlock
                      </Dropdown.Item>
                    )}

                    <Dropdown.Item
                      style={{ color: "white" }}
                      className="bg-gradient"
                    >
                      User Details
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            ))
          ) : (
            <Loading Title="Sorry..!"></Loading >
          )}
        </div>
      </div>
      <Pagination
        handlePageClick={handlePageClick}
        pagecount={pagecount}
      ></Pagination>
    </>
  );
}

export default UserManage;
