import React, { useEffect, useState } from "react";
import head from "../../../src/images/Course Category.png";
import { Link, useNavigate } from "react-router-dom";
import styleshere from "../../components/categories/Categories.module.css";
import { AiOutlinePlusSquare, AiOutlineEdit } from "react-icons/ai";
import axios from "axios";
import Swal from "sweetalert2";
import { MdDeleteOutline } from "react-icons/md";
import { BASEURL } from "../../components/Constants/Constants";
import {
  DeleteNotification,
  showdelete,
} from "../../components/sweetalert/Deleteswal";

function Categories() {
  const Navigate = useNavigate();
  const [Clist, setClist] = useState([]);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    getCategories();
  }, [refresh]);

  const getCategories = () => {
    axios.get(`${BASEURL}/Getcategories`).then((response) => {
      console.log(response);
      setClist(response.data.res);
      console.log(Clist);
    });
  };

  const HandleCategory = () => {
    Navigate("/admin/AddCategory");
  };

  const handleDelete = async (Id) => {
    showdelete().then(async (result) => {
      if (result.isConfirmed) {
        await axios
          .delete(`${BASEURL}/Categories?id=${Id}`)
          .then((res) => {
            console.log(res);
            setRefresh(!refresh);
          })
          .catch((er) => {
            console.log(er);
          });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        DeleteNotification.fire("Cancelled", "Your file is safe :)", "error");
      }
    });
  };

  const handleEdit = (Id) => {
    console.log("Edit", Id);
  };

  return (
    <>
       <div className="HeadDiv rounded-4   d-flex justify-content-center   p-lg-3">
        <h2 className="text-light">Category Management</h2>
      </div>
      <div>
        <div
          className={[styleshere.courses, " align-content-center p-5"].join(
            " "
          )}
        >
          {Clist.length > 0
            ? Clist.map((item, index) => (
                <>
                  <div className={styleshere.course}>
                    <img className="col-3 " src={item.Image} alt="" />
                    <h6 className="m-1">{item.CategoryName}</h6>
                    <div
                      className="d-flex justify-content-between"
                      style={{ cursor: "pointer" }}
                    >
                      <h4 onClick={() => handleDelete(item._id)}>
                        {" "}
                        <MdDeleteOutline></MdDeleteOutline>
                      </h4>
                      <h4 onClick={() => handleEdit(item._id)}>
                        {" "}
                        <AiOutlineEdit></AiOutlineEdit>
                      </h4>
                    </div>
                  </div>
                </>
              ))
            : ""}
          <div className={styleshere.course} onClick={HandleCategory}>
            <h2>
              <AiOutlinePlusSquare></AiOutlinePlusSquare>
            </h2>
            <h6 className="m-1"> Add Category</h6>
          </div>
        </div>
      </div>
    </>
  );
}

export default Categories;
