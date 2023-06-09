import React, { useEffect, useRef } from "react";
import "./../messenger.css";
import { SingleMessage } from "./SingleMessage";
import { useSelector } from "react-redux";

export const Messages = ({ socketId }) => {
  const messages = useSelector(
    (state) => state.messenger.chatHistory[socketId]
  );

  const scrollRef = useRef();
  const scrollToBottom = () => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  return (
    <div className="chatbox_messages_container">
      {messages?.map((message) => (
        <SingleMessage
          key={message.id}
          content={message.content}
          myMessage={message.myMessage}
        />
      ))}
      <div ref={scrollRef} />
    </div>
  );
};
