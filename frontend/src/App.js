// Import necessary libraries
// import "./App.css";
// import io from "socket.io-client";
// import { useEffect, useState } from "react";
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { set } from "mongoose";

// const socket = io.connect("http://localhost:3002");

// function App() {
//   // Room State
//   const { username }= useParams();

//   const [room, setRoom] = useState("");

//   // Messages States
//   const [message, setMessage] = useState("");
//   const [messageReceived, setMessageReceived] = useState("");
//   const [chatId, setChatId] = useState(""); 
//   const [messageList, setMessageList] = useState([]); 
//   const joinRoom = async () => {
//     try {
//         // Fetch existing messages from the server
//         const response = await axios.get(`http://localhost:3000/api/messages/${room}`);

//         if (response.status === 404) {
//             // If the chat doesn't exist, create it
//             await axios.post(`http://localhost:3000/api/messages/${room}`);
//         }

//         // Set the chat ID in the state
//         setChatId(room);

//         // Emit the "join_room" event
//         socket.emit("join_room", room);
//     } catch (error) {
//         console.error('Error joining room:', error.response ? error.response.data : error.message);
//     }
// };

// const sendMessage = async () => {
//     try {
//         console.log(chatId, "", "", message);

//         // Fetch existing messages from the server
//         const response = await axios.get(`http://localhost:3000/api/messages/${chatId}`);
//         const existingMessages = response.data;

//         // Append the new message to the existing array
//         const updatedMessages = [
//             ...existingMessages,
//             { sender: chatId, text: message },
//         ];

//         setMessageList(updatedMessages);
//         console.log(updatedMessages);
//         console.log(chatId);

//         // Update the messages in the database
//         await axios.post(`http://localhost:3000/api/messages/${chatId}`, {
//             chatId: chatId,
//             sender: chatId,
//             text: message,
//         });

//         socket.emit("send_message", { message, room });
//     } catch (error) {
//         console.error('Error sending message:', error.response ? error.response.data : error.message);
//     }
// };

  

  
//   useEffect(() => {
//     socket.on("receive_message", (data) => {
//       setMessageReceived(data.message);
//     });
//   }, [socket]);

//   return (
//     <div className="App">
//       <input
//         placeholder="Room Number..."
//         onChange={(event) => {
//           setRoom(event.target.value);
//         }}
//       />
//       <button onClick={joinRoom}> Join Room</button>
//       <input
//         placeholder="Message..."
//         onChange={(event) => {
//           setMessage(event.target.value);
//         }}
//       />
//       <button onClick={sendMessage}> Send Message</button>
//       <h1> Message:</h1>
//       {messageList.map((messageContent) => {
//         return (
//           <div
//             className="message"
//             id={username === messageContent.author ? "you" : "other"}
//           >
//             <div>
//               <h1>{messageContent.message}</h1>
//               <div className="message-content">
//                 <p>{messageContent.text}</p>
//               </div>
//               <div className="message-meta">
//                 <p id="time">{messageContent.time}</p>
//                 <p id="author">{messageContent.author}</p>
//               </div>
//             </div>
//           </div>
//         );

//       }
//       )}
//     </div>
//   );
// }

// export default App;


// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import Paths from './AppRoutes';
function App() {
 
  return (
    <div>
      <Paths />
    </div>
  );
}


export default App;