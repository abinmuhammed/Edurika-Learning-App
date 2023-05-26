import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../images/Group 20.png'
import axios from 'axios';
import { BASEURL } from '../../components/Constants/Constants';




function AdminLogin() {
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Error, setError] = useState(false);
  const Emailformat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email format
  const Navigate = useNavigate();

  const err = {
    color: "red",
  };
  const LoginASAdmin = async (e) => {
    e.preventDefault();

   

    console.log(Email, password);
    const data={Email,password} 
    try {
        const response = await axios.post(`${BASEURL}/AdminLogin`, data);
        console.log(response.data);
         if(response.data.accesstoken){
            localStorage.setItem("ADMIN",JSON.stringify(response.data.Email))
            localStorage.setItem("token",JSON.stringify(response.data.accesstoken))
            Navigate("/admin/adminHome") 
        }
      } catch (error) {
        console.error(error); 
      }
  
   };
 
    
  return (
    
<div className='LoginDiv'>
<div className="imageDiv">
    <img className='col-lg-9' src={logo} alt="Your Image" />
  </div>

<Form >

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" value={Email} onChange={(e)=>(setEmail(e.target.value))} placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" value={password} onChange={(e)=>(setPassword(e.target.value))} placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="button" onClick={LoginASAdmin}>
       Login As Admin
      </Button>
     </Form>  
</div>

  )
}

export default AdminLogin