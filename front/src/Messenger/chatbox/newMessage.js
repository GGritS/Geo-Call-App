import React, { useState } from "react";
import "./../messenger.css";
import { sendChatMessage } from "../../store/actions/messengerActions";
import { useSelector } from "react-redux";

export const NewMessage = ({ socketId }) => {
  const [message, setMessage] = useState("");
  const [inputDisabled, setInputDisabled] = useState(false);
  const onlineUsers = useSelector((state) => state.map.onlineUsers);

  const handleMessageValueChange = (e) => {
    setMessage(e.target.value);
  };
  const handleKeyPressed = (e) => {
    if (e.code === "Enter" && message.length > 0) {
      processedChatMessage();
      setMessage("");
    }
  };
  const processedChatMessage = () => {
    if (onlineUsers.find((user) => user.socketId === socketId)) {
      sendChatMessage(socketId, message);
    } else {
      setInputDisabled(true);
    }
  };

  return (
    <div className="chatbox_new_message_container">
      <input
        disabled={inputDisabled}
        className="chatbox_new_message_input"
        type="text"
        placeholder="Type yur message..."
        value={message}
        onChange={handleMessageValueChange}
        onKeyDown={handleKeyPressed}
      />
    </div>
  );
};
