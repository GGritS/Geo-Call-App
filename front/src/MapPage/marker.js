import React from "react";
import "./mapPage.css";
import { useDispatch } from "react-redux";
import locationIcon from "../resources/images/location-icon.svg";
import { setCardChosenOption } from "./mapSlice";

export const Marker = ({ myself, socketId, username, coords }) => {
  const dispatch = useDispatch();
  const handleOptionChoose = () => {
    if (!myself) {
      dispatch(
        setCardChosenOption({
          socketId,
          username,
          coords,
        })
      );
    }
  };

  return (
    <div className="map_page_marker_container" onClick={handleOptionChoose}>
      <img src={locationIcon} alt={username} className="map_page_marker_img" />
      <p className="map_page_marker_text">{myself ? "Me" : username}</p>
    </div>
  );
};
