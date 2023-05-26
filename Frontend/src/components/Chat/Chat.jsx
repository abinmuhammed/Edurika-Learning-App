// import React, { useEffect } from "react";
// import { useState } from "react";
// import "./Chat.css";
// import ScrollToBottom from "react-scroll-to-bottom";
// import { io } from "socket.io-client";

// function Chat({ socket, user, room }) {
//   const [currentmessage, setCurrentMessage] = useState("");
//   const [messagelist, setMessagelist] = useState([]);
 
  

//   const sendMessage = async () => {
//     if (currentmessage !== "") {
//       const messageData = {
//         room: room,
//         author: user,
//         message: currentmessage,
//         time:
//           new Date(Date.now()).getHours() +
//           ":" +
//           new Date(Date.now()).getMinutes(),
//       };

//       await socket.emit("send_message", messageData);
//       setMessagelist((list) => [...list, messageData]);
//       console.log(messagelist);
//       setCurrentMessage("");
//     }
//   };
//   useEffect(() => {
//     socket.on("recieve_message", (data) => {
//       setMessagelist((list) => [...list, data]); 
//     });


//   }, [socket]);

//   return (
//     <div className="chat-window">
//       <div className="chat-header">
//         <p>live chat</p>
//       </div>
//       <div className="chat-body">
//         <ScrollToBottom className="message-container">
//           {messagelist.map((messageData) => {
//             return (
//               <div
//                 className="message"
//                 id={user === messageData.author ? "you" : "other"}
//               >
//                 <div>
//                   <div className="message-content">
//                     <p>{messageData.message}</p>
//                   </div>
//                   <div className="message-meta">
//                     <p id="time">{messageData.time}</p>
//                     <p id="author">{messageData.author}</p>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </ScrollToBottom>
//       </div>
//       <div className="chat-footer ">
//         <input
//           className=""
//       // value={currentmessage}
//           type="text"
//           placeholder="hey..."
//           onChange={(e) => {
//             setCurrentMessage(e.target.value);
//           }}
//         />
//         <button className="btn bg-gradient" onClick={sendMessage}>
//           &#9658;
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Chat;
