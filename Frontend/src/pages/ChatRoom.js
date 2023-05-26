// import React from "react";
// import { useState } from "react";
// import { useEffect } from "react";
// import { io } from "socket.io-client";
// import '../components/Chat/Chat.css';
// import Chat from "../components/Chat/Chat";
// const socket = io("http://localhost:4000");
// console.log(socket);

// function ChatRoom() {
//   const [user, setuser] = useState("");
//   const [room, setroom] = useState("");
//   const [showChat, setshowChat] = useState(false);

//   const joinroom = () => {
//     if (user !== "" && room !== "") {
//       socket.emit("join_room", room);
//       setshowChat(true  )
//     }
//   };

//   return (
//     <div className=" App d-flex justify-content-center m-5 p-5">
//       {!showChat?( <div className="joinChatContainer">
//         <h2 className="text-white">Join  Chat</h2>
//         <input
//           type="text"
//           placeholder="jhon..."
//           onChange={(E) => {
//             setuser(E.target.value);
//           }}
//         />
//         <input
//           type="text"
//           placeholder="Room id"
//           onChange={(E) => {
//             setroom(E.target.value);
//           }}
//         />
//         <button onClick={joinroom}>Join A Room</button>
//         </div>

// ): (<Chat socket={socket} user={user} room={room}></Chat>
//    )   }
     
//     </div>
//   );
// }

// export default ChatRoom;
