import React from "react";
import "./mapPage.css";
import GoogleMapReact from "google-map-react";
import { useSelector } from "react-redux";
import { Marker } from "./marker";
import { UserInfoCard } from "./UserInfoCard/userInfoCard";
import Messenger from "../Messenger/Messenger";
import VideoRooms from "../VideoRooms/VideoRooms";

export const MapPage = () => {
  const setMyLocation = useSelector((state) => state.map.myLocation);
  const onlineUsers = useSelector((state) => state.map.onlineUsers);
  const cardChosenOption = useSelector((state) => state.map.cardChoseOption);
  const defaultMapProps = {
    center: {
      lat: setMyLocation.lat,
      lng: setMyLocation.lng,
    },
    zoom: 2,
  };
  return (
    <div className="map_page_container">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultMapProps.center}
        defaultZoom={defaultMapProps.zoom}
      >
        {onlineUsers.map((onlineUser) => (
          <Marker
            lat={onlineUser.coords.lat}
            lng={onlineUser.coords.lng}
            key={onlineUser.socketId}
            myself={onlineUser.myself}
            socketId={onlineUser.socketId}
            username={onlineUser.username}
            coords={onlineUser.coords}
          />
        ))}
      </GoogleMapReact>
      <Messenger />
      {cardChosenOption && (
        <UserInfoCard
          socketId={cardChosenOption.socketId}
          username={cardChosenOption.username}
          userLocation={cardChosenOption.coords}
        />
      )}
      <VideoRooms />
    </div>
  );
};
