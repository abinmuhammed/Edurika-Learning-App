import React from "react";
import profile from "../../images/Elon musk.png";
import "../Community/Conversation.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { BASEURL } from "../Constants/Constants";

function Conversation({ data, user,whom }) {
  const [Chatfriend, setchatfriend] = useState(null);
  useEffect(() => {
    getMentor();
  }, []);

  const getMentor = async() => {
    const friendId = data.members.find((m) => m !== user);
    try {
     
      if(whom=="Student"){
        let result = await axios.get(`${BASEURL}/mentor?userId=${friendId}`);
        console.log(result.data ,'freind id ');
        setchatfriend(result.data);
      }else{
        let result = await axios.get(`${BASEURL}/user?userId=${friendId}`);
        setchatfriend(result.data);
      }
      
 
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Conversation ">
      <img src={profile} className="Conversation-Image" alt="" />
      <span className="ConversationName">
        {Chatfriend ? Chatfriend.FirstName : ""}
      </span>
    </div>
  );
}

export default Conversation;
