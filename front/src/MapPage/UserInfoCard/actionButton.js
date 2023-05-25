import React from "react";
import "./../mapPage.css";
import { ChatButton } from "./chatButton";

export const ActionButton = ({ socketId, username }) => {
  return (
    <div className="map_page_card_buttons_container">
      <ChatButton socketId={socketId} username={username} />
    </div>
  );
};
