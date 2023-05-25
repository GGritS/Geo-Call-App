import React from "react";
import { useSelector } from "react-redux";
import "./../mapPage.css";
import { calculateDistanceBetweenCoords } from "../../utils/location";
import { ActionButton } from "./actionButton";

const Label = ({ fontSize, text }) => {
  return (
    <p className="map_page_card_label" style={{ fontSize }}>
      {text}
    </p>
  );
};

export const UserInfoCard = ({ username, userLocation, socketId }) => {
  const myLocation = useSelector((state) => state.map.myLocation);
  return (
    <div className="map_page_card_container">
      <Label text={username} fontSize="16px" />
      <Label
        text={`${calculateDistanceBetweenCoords(myLocation, userLocation)}km`}
        fontSize="14px"
      />
      <ActionButton socketId={socketId} username={username} />
    </div>
  );
};
