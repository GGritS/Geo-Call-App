import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { Logo } from "./logo";
import { LoginInput } from "./loginInput";
import { LoginButton } from "./loginButton";
import { useDispatch, useSelector } from "react-redux";
import { setMyLocation } from "../MapPage/mapSlice";
import { getFakeLocation } from "./FAKE_LOCATION";
import { connectWithSocketIoServer } from "../socketConnection/socketConn";
import { proceedWithLogin } from "../store/actions/loginPageActions";

const isUserNameValid = (username) => {
  return username.length <= 0 || username.length > 10 || username.includes(" ");
};

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [locationErrorOccurred, setLocationErrorOccurred] = useState(false);
  const myLocation = useSelector((state) => state.map.myLocation);

  const navgite = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = () => {
    proceedWithLogin({
      username,
      coords: {
        lng: myLocation.lng,
        lat: myLocation.lat,
      },
    });
    navgite("/map");
  };

  const locationOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  const onSuccess = (position) => {
    dispatch(
      setMyLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    );
  };
  const onError = (error) => {
    setLocationErrorOccurred(true);
  };

  useEffect(() => {
    // navigator.geolocation.getCurrentPosition(
    //   onSuccess,
    //   onError,
    //   locationOptions
    // );
    onSuccess(getFakeLocation());
  }, []);

  useEffect(() => {
    if (myLocation) {
      connectWithSocketIoServer();
    }
  }, [myLocation]);

  return (
    <div className="l_page_main_container">
      <div className="l_page_box">
        <Logo />
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <h2 style={{ color: "white" }}>Please enter your name </h2>
          <LoginInput userName={username} setUserName={setUsername} />
          <LoginButton
            disabled={isUserNameValid(username) || locationErrorOccurred}
            onClickHandler={handleLogin}
          />
        </div>
      </div>
    </div>
  );
};
