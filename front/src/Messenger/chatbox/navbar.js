import React from "react";
import "./../messenger.css";
import closeIcon from "../../resources/images/close-icon.svg";
import { useDispatch } from "react-redux";
import { removeChatbox } from "../messengerSlice";

const ChatboxLabel = ({ username }) => {
  return <p className="chatbox_nav_bar_label">{username}</p>;
};
const CloseButton = ({ socketId }) => {
  const dispatch = useDispatch();
  const handleClosChatbox = () => {
    dispatch(removeChatbox(socketId));
  };
  return (
    <div className="chatbox_close_icon_container" onClick={handleClosChatbox}>
      <img alt="close" src={closeIcon} className="chatbox_close_icon_img" />
    </div>
  );
};

export const Navbar = ({ username, socketId }) => {
  return (
    <div className="chatbox_nav_bar_container">
      <ChatboxLabel username={username} />
      <CloseButton socketId={socketId} />
    </div>
  );
};
