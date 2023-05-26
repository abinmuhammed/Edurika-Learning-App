import React, { useRef } from "react";
import "./Chatpage.css";
import Conversation from "../components/Community/Conversation";
import Message from "../components/Community/Message/Message";
import { useState } from "react";
import axios from "axios";
import { BASEURL } from "../components/Constants/Constants";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { Prev } from "react-bootstrap/esm/PageItem";
import SearchResult from "../components/Community/Search Result/SearchResult";
import {AiOutlineSearch} from 'react-icons/ai';
import { sweetNote } from "../components/sweetalert/sweetalert2";
import { socket } from "../components/Constants/Constants";
function Chat({ user }) {
  const [Convo, setConvo] = useState([]);
  const [Messages, setMessages] = useState([]);
  const [currentChat, setcurrentchat] = useState(null);
  const [newMessage, setnewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [searchMentor, setSearchMentor] = useState("");
  

  const scrollref = useRef();
  
  let userId;
  userId =
    user == "Student"
      ? localStorage.getItem("userId")
      : localStorage.getItem("MentorID");

  userId = userId.replace('"', "");
  userId = userId.replace('"', "");

  useEffect(() => {


    socket.on("getMessage", (data) => {
                                    
      if(data.recieverId==userId&&data.senderId!==userId){

        setArrivalMessage({
          sender: data.senderId,
          text: data.text,
          createdAt: Date.now()
        });
        
      }
     
    });


    return () => {
      socket.emit("disconnected");
    };
  }, []);

  useEffect(() => {
   
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
    console.log("messages", Messages);
  }, [arrivalMessage, currentChat]);


  useEffect(() => {
    getConversation();
  }, []);

  const getConversation = async () => {
    try {
      const messageData = await axios.get(
        `${BASEURL}/chat/conversation/${userId}`
      );
      console.log(messageData.data);
      setConvo(messageData.data);
      console.log(Convo);
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    getMessages();
  }, [currentChat]);

  const getMessages = async () => {
    try {
      await axios
        .get(`${BASEURL}/chat/message/${currentChat._id}`)
        .then((response) => {
          setMessages(response.data);
        });
    } catch (error) {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage !== "") {
      const message = {
        conversationId: currentChat._id,
        sender: userId,
        text: newMessage,
      };
      console.log(currentChat, "currentchat");
      const recieverId = currentChat.members.find(
        (member) => member !== userId
      );

      console.log(recieverId);

      socket.emit("sendMessage", {
        senderId: userId,
        recieverId,
        text: newMessage,
      });

      try {
        await axios.post(`${BASEURL}/chat/message`, message).then((res) => {
          setnewMessage("");

          setMessages([...Messages, res.data]);
          console.log(newMessage, "new");
        });
      } catch (error) {
        alert(error);
      }
    }
  };

  useEffect(() => {
    scrollref.current?.scrollIntoView({ behavior: "smooth" });
  }, [Messages]);

  const handleSearch = async (e) => {
    const input = e.target.value;
    await axios
      .get(`${BASEURL}/searchMentor?searchTerm=${input}`)
      .then((res) => {
        console.log(res.data.res);
        setSearchMentor(res.data.res);
      });
  };

  const handleSearchUser = async (item) => {
    await axios
      .get(`${BASEURL}/chat/newConversation/${userId}/${item._id}`)
      .then((res) => {
        console.log(res.data.conversation._id);
        setcurrentchat(res.data.conversation._id);
      });
  };

  return (
    <div className="messenger ">
      <div className="chatMenu ">
        <div className="chatMenuWrapper bg-gradient">
          <div>
            {user == "Student" ? (
              <div className="d-flex justify-content-start ">
             
             <h3 className="text-light opacity-25 col-1 ms-3 mt-1 me-2 "><AiOutlineSearch></AiOutlineSearch> </h3>
             <div className="col-8 "><input
                type="text"
                className="ChatMenuInput col-3 "
                placeholder="Search for mentors...."
                onChange={handleSearch}
              /></div>
             
              </div>
            ) : (
              <h3 className="text-white">Recent Chats</h3>
            )}
            {Convo.map((item, index) => (
              <div onClick={() => setcurrentchat(item)}>
                <Conversation
                  data={item}
                  user={userId}
                  whom={user}
                ></Conversation>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="chatBox bg-gradient">
        <div className="ChatBoxWrapper">
          {currentChat ? (
            <>
              <div className="ChatboxTop">
                {Messages.length > 0 ? (
                  Messages.map((m) => (
                    <div ref={scrollref}>
                      <Message message={m} own={m.sender === userId}></Message>
                    </div>
                  ))
                ) : (
                  <h2 className="m-lg-4 ">start a new chat....</h2>
                )}
              </div>
              <div className="ChatboxBottom">
                <textarea
                  value={newMessage}
                  className="ChatMessageInput"
                  placeholder="write Something...."
                  onChange={(e) => setnewMessage(e.target.value)}
                ></textarea>
                <button className="ChatSubmitButton" onClick={handleSubmit}>
                  Send
                </button>
              </div>
            </>
          ) : (
            <span className="noConvo col-sm-5 opacity-50">
              Open a Conversation to start a chat
            </span>
          )}
        </div>
      </div>
      <div className="chatOnline">
   
        <div className="chatOnlineWrapper bg-gradient">
        {user == "Student" ? <h4 className="text-light ms-3">Our Mentors </h4> : ""}
          {searchMentor.length > 0
            ? searchMentor.map((item, index) => (
                <div onClick={() => handleSearchUser(item)}>
                  <SearchResult item={item}></SearchResult>
                </div>
              ))
            : ""}
        </div>
      </div>
    </div>
  );
}

export default Chat;
