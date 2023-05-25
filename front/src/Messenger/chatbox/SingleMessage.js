import React from "react";
import "./../messenger.css";

export const SingleMessage = ({ content, myMessage }) => {
  return (
    <div
      className="chatbox_message_wrapper"
      style={{ justifyContent: myMessage ? "flex-end" : "flex-start" }}
    >
      {myMessage ? (
        <p className="chatbox_message_right">{content}</p>
      ) : (
        <p className="chatbox_message_left">{content}</p>
      )}
    </div>
  );
};
