import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import { BASEURL } from "../../Constants/Constants";

function AddCategoryForm() {
  const [Image, setImage] = useState(null);
  const [CategoryName, setCategoryName] = useState("");
  const [Description, setDescription] = useState("");
  const [Namevalid ,SetNamevalid]=useState(true)
  const [Desvalid,setDesValid]=useState(true)
  const [Error,SetError]=useState(true)

  const err = {
    color: "red",
  };
  const handleName = (e) => {
    const input = e.target.value;
    const pattern = /^[a-zA-Z][a-zA-Z0-9_]*$/;
    setCategoryName(input);
    SetNamevalid(pattern.test(input))
  };
  const HandleDescription = (e) => {
    const input = e.target.value;
    const pattern = /^[a-zA-Z][a-zA-Z0-9_]*$/;
     setDesValid(pattern.test(input)) 
    setDescription(input);
  };


  const handlesubmit = (e) => {
    e.preventDefault();
    
    if(!CategoryName||!Description){
    SetError(true)
    return false;
    }

    if(!Namevalid||!Desvalid){
      return ;
      }
    
    const formData=new FormData();
    formData.append("Image",Image)
    formData.append("CategoryName",CategoryName)
    formData.append("Description",Description)
    axios.post(BASEURL + "/addnewCategory",formData).then((response)=>{
        console.log((response));
    }).then(()=>{
        
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });
  
          Toast.fire({
            icon: "success",
            title: "Category Uploaded successfully",
          });
    })
  };


  return (
    <>
      <div className="d-flex justify-content-center mt-5">
        <Form onSubmit={handlesubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              value={CategoryName}
              placeholder="Enter Category Name"
              onChange={handleName}
            />
             {!Namevalid && (
            <div style={err}>
              <p>Enter a valid Name !</p>
            </div>
          )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Description</Form.Label>
            <Form.Control value={Description} onChange={HandleDescription} type="text" placeholder="Enter Description" />
            {!Desvalid && (
            <div style={err}>
              <p>Enter valid Description !</p>
            </div>
          )}
          </Form.Group>

          <Form.Label className="me-3">Icon-Image </Form.Label>
          <input
            className="bg-dark bg-gradient"
            type="file"
            name="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <button className="btn btn-dark bg-gradient m-2" type="submit">
            Submit
          </button>
        </Form>
      </div>
    </>
  );
}

export default AddCategoryForm;
