import React from "react";
import "./messenger.css";
import { Chatbox } from "./chatbox/chatbox";
import { useSelector } from "react-redux";

// const dummy_chatbox = [
//   {
//     username: "Ivan",
//     socketId: 21231,
//     messages: [],
//   },
//   {
//     username: "Ivan2",
//     socketId: 21233,
//     messages: [],
//   },
//   {
//     username: "Ivan3",
//     socketId: 21235,
//     messages: [],
//   },
// ];

const Messenger = () => {
  const chatboxes = useSelector((state) => state.messenger.chatboxes);
  return (
    <div className="messenger_container">
      {chatboxes.map((chatbox, index) => (
        <Chatbox
          key={index}
          socketId={chatbox.socketId}
          username={chatbox.username}
        />
      ))}
    </div>
  );
};

export default Messenger;
