import React from 'react'
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";

function Addbanner() {  
  return (
    <>
    <div className="d-flex justify-content-center mt-5">
      <Form onSubmit={handlesubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Category Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Category Name"
            onChange={handleName}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Description</Form.Label>
          <Form.Control onChange={HandleDescription} type="text" placeholder="Enter Description" />
          <Form.Text className="text-muted"></Form.Text>
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
  )
}

export default Addbanner