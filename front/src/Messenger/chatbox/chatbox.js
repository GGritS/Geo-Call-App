import React from "react";
import "./../messenger.css";
import { Navbar } from "./navbar";
import { Messages } from "./messages";
import { NewMessage } from "./newMessage";

export const Chatbox = (props) => {
  return (
    <div className="chatbox_container">
      <Navbar {...props} />
      <Messages socketId={props.socketId} />
      <NewMessage socketId={props.socketId} />
    </div>
  );
};
