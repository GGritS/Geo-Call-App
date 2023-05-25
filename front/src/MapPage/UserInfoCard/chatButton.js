import React from "react";
import "./../mapPage.css";
import chatIcon from "../../resources/images/chat-icon.svg";
import { useDispatch } from "react-redux";
import { addChatbox } from "../../Messenger/messengerSlice";

export const ChatButton = ({ socketId, username }) => {
  const dispatch = useDispatch();
  const handleAddChatbox = () => {
    dispatch(
      addChatbox({
        username,
        socketId,
      })
    );
  };
  return (
    <img
      src={chatIcon}
      className="map_page_card_img"
      alt={"chat-icon"}
      onClick={handleAddChatbox}
    ></img>
  );
};
