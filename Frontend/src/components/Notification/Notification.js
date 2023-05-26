import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { AiFillSetting,AiFillPushpin } from "react-icons/ai";
import { BASEURL } from "../Constants/Constants";
import { format } from "timeago.js";
import { socket } from "../Constants/Constants";
import { sweetNote } from "../sweetalert/sweetalert2";

function Notification({ show = false, size = "sm-down", handleShow}) {

const [notification,setNotification]=useState([])
const [newNotification,setNewNotification]=useState(false)


  useEffect(() => {
    getNotification();
  }, [newNotification]);


  const user=localStorage.getItem('user')
  
  // notification only meant for users 

  if(user){
    socket.on("get_course_disabled_notify",(data)=>{
      sweetNote(data.text,"error")
      setNewNotification(!newNotification)
     
    })

    socket.on("get_course_added",(data)=>{
      sweetNote(data.text)
      setNewNotification(!newNotification)
    })
  }



  

  const getNotification = async () => {
    await axios.get(`${BASEURL}/notification`).then((res) => {
     
      setNotification(res.data.msg.slice(-7))
    }).catch((err)=>{
     console.log(err)
    })
  };



  return (
    <>
      <Modal show={show} size={size} onHide={handleShow}>
        <div
          className="d-flex justify-content-between p-1 bg-gradient custom-back "
          closeButton
        >
          <Modal.Title className="text-light opacity-50 ">
            Notifications
          </Modal.Title>
          <span>
            <AiFillSetting />
          </span>
        </div>

        {notification.length>0?notification.reverse().map((item,idx)=>
          (
            <>
            <Modal.Body className="bg-dark text-light  fw-semibold">
         <AiFillPushpin></AiFillPushpin> {item.notification}
            
          </Modal.Body>
          <div className="bg-dark ">
            
          <span className="fw-bolder bg-dark text-light  ms-3 opacity-50 "> {format(item.createdAt)}</span>
          </div>
          </>
          )
          
          
        ):"" }
        
       
        <Modal.Footer className="custom-back bg-dark bg-gradient">
          <Button className="btn-dark bg-gradient" onClick={handleShow}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Notification;
